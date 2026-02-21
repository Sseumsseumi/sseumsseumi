package com.inyeon.sseumsseumi.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum AuthErrorCode {
    NOT_EXISTS("유효하지 않은 정보입니다.", UNAUTHORIZED);

    private final String message;
    private final HttpStatus httpStatus;
}
