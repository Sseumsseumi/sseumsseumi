package com.inyeon.sseumsseumi.security.service.interfaces;

import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.model.dto.request.RefreshRequest;
import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void login(LoginRequest loginRequest, HttpServletResponse response);
    void logout();
    TokenResponse refresh(RefreshRequest refreshRequest); //토큰 재발급
}
