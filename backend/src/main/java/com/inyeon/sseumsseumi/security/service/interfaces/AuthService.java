package com.inyeon.sseumsseumi.security.service.interfaces;

import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.model.dto.response.TokenResponse;
import com.inyeon.sseumsseumi.user.model.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void login(LoginRequest loginRequest, HttpServletResponse response);
    void logout(User user, HttpServletRequest request, HttpServletResponse response);
    boolean refresh(HttpServletRequest request, HttpServletResponse response); //토큰 재발급
}
