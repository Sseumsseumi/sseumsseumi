package com.inyeon.sseumsseumi.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_EXISTS_USER("존재하지 않는 회원 입니다.", UNAUTHORIZED),
    ALREADY_IN_ID("이미 존재하는 아이디 입니다.", CONFLICT),
    INVALID_LOGIN_ID_FORMAT("입력 형식이 올바르지 않습니다.", BAD_REQUEST),
    INVALID_PASSWORD_FORMAT("입력 형식이 올바르지 않습니다.", BAD_REQUEST),
    TRANSACTION_FAIL("트랜젝션에 실패했습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
