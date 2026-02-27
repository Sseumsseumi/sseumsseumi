package com.inyeon.sseumsseumi.global.handler;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.security.exception.AuthException;
import com.inyeon.sseumsseumi.security.exception.JwtException;
import com.inyeon.sseumsseumi.user.exception.UserErrorCode;
import com.inyeon.sseumsseumi.user.exception.UserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * UserException 처리
     * - 사용자 관련 예외 (존재하지 않는 회원, 중복 아이디 등)
     */
    @ExceptionHandler(UserException.class)
    public ResponseEntity<MessageUtils> handleUserException(UserException e) {
        log.warn("UserException 발생: code={}, message={}",
                e.getErrorCode().name(), e.getMessage());

        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(MessageUtils.fail(
                        e.getErrorCode().name(),
                        e.getErrorCode().getMessage()
                ));
    }

    /**
     * AuthException 처리
     * - 인증 관련 예외 (로그인 실패, 토큰 만료 등)
     */
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<MessageUtils> handleAuthException(AuthException e) {
        log.warn("AuthException 발생: code={}, message={}",
                e.getErrorCode().name(), e.getMessage());

        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(MessageUtils.fail(
                        e.getErrorCode().name(),
                        e.getErrorCode().getMessage()
                ));
    }

    /**
     * UserRegisterException 처리
     * - 아이디, 비밀번호 형식 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageUtils> handleValidationException(
            MethodArgumentNotValidException ex) {

        String errorCodeName = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        UserErrorCode errorCode = UserErrorCode.valueOf(errorCodeName);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(MessageUtils.fail(
                        errorCode.name(),
                        errorCode.getMessage()
                ));
    }

    /**
     * Jwt 처리
     * @param e
     * @return
     */
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<MessageUtils> handleJwtException(JwtException e) {
        log.warn("JwtException 발생: code={}, message={}",
                e.getErrorCode().name(), e.getMessage());

        return ResponseEntity
                .status(e.getErrorCode().getHttpStatus())
                .body(MessageUtils.fail(
                        e.getErrorCode().name(),
                        e.getErrorCode().getMessage()
                ));
    }


    /**
     * 예상치 못한 예외 처리
     * - 500 Internal Server Error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageUtils> handleException(Exception e) {
        log.error("예상치 못한 예외 발생", e);

        return ResponseEntity
                .status(500)
                .body(MessageUtils.fail(
                        "INTERNAL_SERVER_ERROR",
                        "서버 오류가 발생했습니다."
                ));
    }
}
