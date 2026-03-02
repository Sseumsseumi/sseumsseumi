package com.inyeon.sseumsseumi.security.service;

import com.inyeon.sseumsseumi.security.exception.AuthException;
import com.inyeon.sseumsseumi.security.exception.JwtErrorCode;
import com.inyeon.sseumsseumi.security.exception.JwtException;
import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import com.inyeon.sseumsseumi.security.service.interfaces.AuthService;
import com.inyeon.sseumsseumi.security.service.interfaces.TokenService;
import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.inyeon.sseumsseumi.security.exception.AuthErrorCode.LOGIN_FAILED;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @Override
    public void login(LoginRequest loginRequest, HttpServletResponse response) {
        //1. ID, Password 검증
        User user = userService.findByLoginId(loginRequest.getId());
        //회원 존재, 비밀번호 일치
        if(user!=null && passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            //2. AccessToken, RefreshToken 생성
            TokenResponse tokenResponse = tokenService.generatedToken(user.getId());

            //3. 생성한 AccessToken, RefreshToken 쿠키에 삽입
            setCookies(tokenResponse.getAccessToken(), tokenResponse.getRefreshToken(), response, 60*15, 7*24*60*60);

            return;
        }
        throw new AuthException(LOGIN_FAILED);
    }

    @Override
    public void logout(User user, HttpServletRequest request, HttpServletResponse response) {
        //1. Cookie에서 AccessToken, RefreshToken 가져오기
        String accessToken = null;
        String refreshToken = null;

        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("accessToken")){
                accessToken =  cookie.getValue();
            }
            else if(cookie.getName().equals("refreshToken")){
                refreshToken = cookie.getValue();
            }
        }

        //2. AccessToken, RefreshToken 만료시킨 후 쿠키에 삽입
        setCookies(accessToken, refreshToken, response, 0, 0);

        //3. Redis에서 토큰 제거
        tokenService.removeToken(user.getId());
    }

    @Override
    public boolean refresh(HttpServletRequest request, HttpServletResponse response) {
        //1. Cookie에서 RefreshToken 가져오기
        String refreshToken = null;

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refreshToken")) {
                refreshToken = cookie.getValue();
                break;
            }
        }

        // 2. RefreshToken이 없으면 예외
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new JwtException(JwtErrorCode.MISSING_TOKEN);
        }

        log.debug("Cookie에서 추출한 refreshToken: {}", refreshToken);

        //3. Bearer 접두사 제거
        if (refreshToken.startsWith("Bearer ") || refreshToken.startsWith("Bearer_")) {
            refreshToken = refreshToken.substring(7);  // "Bearer " 또는 "Bearer_" 제거
            log.debug("Bearer 제거 후: {}", refreshToken);
        }

        //4. RefreshToken 검증하기
        TokenResponse newToken = tokenService.republishToken(refreshToken);

        if(newToken != null){
            log.debug("새로운 토큰 : {}", newToken.getRefreshToken());
        }

        //5-1. 검증 실패 → RefreshToken 만료시킨 후 쿠키에 삽입
        if(newToken == null){
            setCookies(null, refreshToken, response, 0, 0);

            return false;
        }
        //5-2. 검증 성공 → 재발급 한 AccessToken, RefreshToken 쿠키에 삽입
        else {
            setCookies(newToken.getAccessToken(), newToken.getRefreshToken(), response, 60*15, 7*24*60*60);

            return true;
        }
    }
    
    //토큰 쿠키에 세팅
    private void setCookies(String accessToken, String refreshToken, HttpServletResponse response,
                            long accessTokenMaxAge, long refreshTokenMaxAge) {
        if(accessToken != null) {
            ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                    .maxAge(accessTokenMaxAge) //토큰 유효기간
                    .path("/")
                    .secure(true) //HTTPS 환경에서만 쿠키 발동
                    .sameSite("None") //Cross-Site 요청에서 쿠키 전송 됨
                    .httpOnly(false) //JavaScript 접근 가능
                    .build();

            response.addHeader("Set-Cookie", accessTokenCookie.toString());
        }
        if(refreshToken != null) {
            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .maxAge(refreshTokenMaxAge) //토큰 유효기간
                    .path("/")
                    .secure(true) //HTTPS 환경에서만 쿠키 발동
                    .sameSite("None") //Cross-Site 요청에서 쿠키 전송 됨
                    .httpOnly(true) //JavaScript 접근 가능
                    .build();

            response.addHeader("Set-Cookie", refreshTokenCookie.toString());
        }
    }
}
