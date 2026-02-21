package com.inyeon.sseumsseumi.security.controller;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.model.dto.request.RefreshRequest;
import com.inyeon.sseumsseumi.security.service.AuthServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final AuthServiceImpl authService;

    /**
     * 로그인
     * @param loginRequest
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<MessageUtils> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.debug(loginRequest.toString());
        authService.login(loginRequest, response);
        return ResponseEntity.ok().body(MessageUtils.success());
    }

    /**
     * 로그아웃
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<MessageUtils> logout() {
        authService.logout();
        return ResponseEntity.ok().body(MessageUtils.success());
    }

    /**
     * 토큰 재발급
     * @param refreshRequest
     * @return
     */
    @PostMapping("/refresh")
    public ResponseEntity<MessageUtils> refresh(@RequestBody RefreshRequest refreshRequest){
        return ResponseEntity.ok().body(MessageUtils.success(authService.refresh(refreshRequest)));
    }
}
