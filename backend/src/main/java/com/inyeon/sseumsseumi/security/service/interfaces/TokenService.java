package com.inyeon.sseumsseumi.security.service.interfaces;

import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;

public interface TokenService {
    TokenResponse generatedToken(Long id); //토큰 생성
    void removeToken(Long id); //토큰 삭제
    TokenResponse republishToken(String refreshToken); //토큰 재발행
}
