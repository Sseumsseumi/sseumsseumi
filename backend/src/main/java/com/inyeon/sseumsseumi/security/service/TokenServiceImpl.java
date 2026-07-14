package com.inyeon.sseumsseumi.security.service;

import com.inyeon.sseumsseumi.security.exception.JwtErrorCode;
import com.inyeon.sseumsseumi.security.exception.JwtException;
import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import com.inyeon.sseumsseumi.security.model.entity.Token;
import com.inyeon.sseumsseumi.security.repository.RedisRepository;
import com.inyeon.sseumsseumi.security.service.interfaces.TokenService;
import com.inyeon.sseumsseumi.security.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.inyeon.sseumsseumi.security.exception.JwtErrorCode.NOT_EXISTS_TOKEN;

@Slf4j
@RequiredArgsConstructor
@Service
public class TokenServiceImpl implements TokenService {
    private final JwtUtil jwtUtil;
    private final RedisRepository redisRepository;

    @Override
    public TokenResponse generatedToken(Long id) {
        //토큰 생성
        String accessToken = jwtUtil.generateAccessToken(id);
        String refreshToken = jwtUtil.generateRefreshToken(id);

        //레디스 저장
        redisRepository.save(new Token(id, refreshToken));

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void removeToken(Long id) {
        //삭제할 토큰 가져오기
        Token token = redisRepository.findById(id).orElseThrow(()->new JwtException(NOT_EXISTS_TOKEN));

        //토큰 삭제
        redisRepository.delete(token);
    }

    @Override
    public TokenResponse republishToken(String refreshToken) {
        log.debug("republishToken 함수 refreshToken : {}", refreshToken);

        //1. JwtUtil에서 RefreshToken 검증
        if(jwtUtil.validateRefreshToken(refreshToken) != null){
            log.debug("검증 완료");

            //2. RefreshToken 로그인 된 회원 정보 추출
            Long id = jwtUtil.getUserIdFromRefreshToken(refreshToken);
            log.debug("회원 정보 : {}", id);

            //3. Redis에서 RefreshToken 조회
            Token token = redisRepository.findById(id).orElseThrow(()->new JwtException(NOT_EXISTS_TOKEN));
            log.debug("Redis 토큰 : {}", token.getRefreshToken());

            //4. Redis에서 조회한 RefreshToken과 클라이언트가 전송한 RefreshToken 일치 여부 검증
            if(refreshToken.equals(token.getRefreshToken().substring(7))){
                //5. 일치할 경우 AccessToken, RefreshToken 모두 재발급
                TokenResponse newToken = generatedToken(id);
                //6. 갱신 전 RefreshToken 삭제
                removeToken(id);
                //7. 갱신 후 RefreshToken 저장
                redisRepository.save(new Token(id, newToken.getRefreshToken()));

                return newToken;
            }
            else {
                //redis에서 RefreshToken 무효화 처리
                removeToken(id);
                return null;
            }
        }
        //검증 안될 경우 예외 처리
        throw new JwtException(JwtErrorCode.NOT_EXISTS_TOKEN);
    }
}
