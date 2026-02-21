package com.inyeon.sseumsseumi.security.service;

import com.inyeon.sseumsseumi.security.exception.AuthException;
import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.model.dto.request.RefreshRequest;
import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import com.inyeon.sseumsseumi.security.service.interfaces.AuthService;
import com.inyeon.sseumsseumi.security.service.interfaces.TokenService;
import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.inyeon.sseumsseumi.security.exception.AuthErrorCode.NOT_EXISTS;

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

            //3. AccessToken → Cookie
            ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", tokenResponse.getAccessToken())
                    .maxAge(60 * 15) //토큰 유효기간(15분)
                    .path("/")
                    .secure(true) //HTTPS 환경에서만 쿠키 발동
                    .sameSite("Strict") //Cross-Site 요청에서 쿠키 전송 안됨
                    .httpOnly(false) //JavaScript 접근 가능
                    .build();
            response.addHeader("Set-Cookie", accessTokenCookie.toString());

            //4. Refresh → Cookie
            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokenResponse.getRefreshToken())
                    .maxAge(7 * 24 * 60 * 60) //토큰 유효기간(7일)
                    .path("/")
                    .secure(true) //HTTPS 환경에서만 쿠키 발동
                    .sameSite("Strict") //Cross-Site 요청에서 쿠키 전송 안됨
                    .httpOnly(true) //JavaScript 접근 차단
                    .build();
            response.addHeader("Set-Cookie", refreshTokenCookie.toString());

            return;
        }
        throw new AuthException(NOT_EXISTS);
    }

    @Override
    public void logout() {

    }

    @Override
    public TokenResponse refresh(RefreshRequest refreshRequest) {
        return null;
    }
}
