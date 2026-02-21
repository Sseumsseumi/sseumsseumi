package com.inyeon.sseumsseumi.security.service;

import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import com.inyeon.sseumsseumi.security.model.entity.Token;
import com.inyeon.sseumsseumi.security.repository.RedisRepository;
import com.inyeon.sseumsseumi.security.service.interfaces.TokenService;
import com.inyeon.sseumsseumi.security.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    }

    @Override
    public TokenResponse republishToken(String refreshToken) {
        return null;
    }
}
