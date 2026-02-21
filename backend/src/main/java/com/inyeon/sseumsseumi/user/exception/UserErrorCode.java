package com.inyeon.sseumsseumi.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_EXISTS_USER("아이디 혹은 비밀번호가 일치하지 않습니다.", UNAUTHORIZED),
    ALREADY_IN_ID("이미 존재하는 아이디 입니다.", BAD_REQUEST),
    TRANSACTION_FAIL("트랜젝션에 실패했습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
