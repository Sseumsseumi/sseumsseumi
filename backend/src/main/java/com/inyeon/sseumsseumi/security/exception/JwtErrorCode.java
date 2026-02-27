package com.inyeon.sseumsseumi.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum JwtErrorCode {
    // 토큰 없음
    MISSING_TOKEN("토큰이 제공되지 않았습니다.", UNAUTHORIZED),
    // 토큰 형식 오류
    INVALID_TOKEN_FORMAT("토큰 형식이 올바르지 않습니다.", UNAUTHORIZED),
    // 서명 오류
    INVALID_SIGNATURE("유효하지 않은 토큰 서명입니다.", UNAUTHORIZED),
    // 만료된 토큰
    EXPIRED_TOKEN("만료된 토큰입니다.", UNAUTHORIZED),
    // 지원하지 않는 토큰
    UNSUPPORTED_TOKEN("지원하지 않는 토큰입니다.", UNAUTHORIZED),
    // 잘못된 토큰
    MALFORMED_TOKEN("손상된 토큰입니다.", UNAUTHORIZED),
    // 블랙리스트 토큰
    BLACKLISTED_TOKEN("로그아웃된 토큰입니다.", UNAUTHORIZED),
    //없는 토큰
    NOT_EXISTS_TOKEN("유효하지 않은 토큰입니다.", UNAUTHORIZED);
    
    private final String message;
    private final HttpStatus httpStatus;
}
