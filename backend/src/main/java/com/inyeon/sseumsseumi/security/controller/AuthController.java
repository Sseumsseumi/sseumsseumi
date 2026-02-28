package com.inyeon.sseumsseumi.security.controller;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.security.exception.JwtErrorCode;
import com.inyeon.sseumsseumi.security.model.dto.request.LoginRequest;
import com.inyeon.sseumsseumi.security.service.interfaces.AuthService;
import com.inyeon.sseumsseumi.user.model.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final AuthService authService;

    /**
     * 로그인
     * @param loginRequest
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<MessageUtils> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        authService.login(loginRequest, response);

        return ResponseEntity.ok().body(MessageUtils.success());
    }

    /**
     * 로그아웃
     * @param user
     * @param request
     * @param response
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<MessageUtils> logout(@AuthenticationPrincipal User user, HttpServletRequest request, HttpServletResponse response) {
        authService.logout(user, request, response);

        return ResponseEntity.ok().body(MessageUtils.success());
    }

    /**
     * 토큰 재발급
     * @param request
     * @param response
     * @return
     */
    @GetMapping("/refresh")
    public ResponseEntity<MessageUtils> refresh(HttpServletRequest request, HttpServletResponse response){
        if(authService.refresh(request, response)){
            return ResponseEntity.ok().body(MessageUtils.success());
        }
        //리프레쉬 토큰 잘못됐을 경우
        else {
            return ResponseEntity.status(JwtErrorCode.NOT_EXISTS_TOKEN.getHttpStatus())
                    .body(MessageUtils.fail(JwtErrorCode.NOT_EXISTS_TOKEN.getHttpStatus().name(), JwtErrorCode.NOT_EXISTS_TOKEN.getMessage()));
        }
    }
}
