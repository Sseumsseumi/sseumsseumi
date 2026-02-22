package com.inyeon.sseumsseumi.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum AuthErrorCode {
    LOGIN_FAILED("아이디 또는 비밀번호가 일치하지 않습니다.", UNAUTHORIZED);

    private final String message;
    private final HttpStatus httpStatus;
}
