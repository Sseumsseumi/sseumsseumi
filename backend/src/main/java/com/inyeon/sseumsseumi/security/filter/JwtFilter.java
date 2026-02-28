package com.inyeon.sseumsseumi.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.security.exception.JwtErrorCode;
import com.inyeon.sseumsseumi.security.exception.JwtException;
import com.inyeon.sseumsseumi.security.utils.JwtUtil;
import com.inyeon.sseumsseumi.user.exception.UserErrorCode;
import com.inyeon.sseumsseumi.user.exception.UserException;
import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper = createObjectMapper();
    private final UserRepository userRepository;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private static final String[] ALLOWED_URIS={ //접근 허용 whitelist
            "/v1/auth/login",
            "/v1/user/regist",
            "/v1/auth/refresh",
            //swagger
            "/favicon.ico",
            "/error",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/v3/api-docs/**",
            //health check
            "/actuator",
            "/api/",
    };

    /**
     * ObjectMapper 생성 메서드
     */
    private static ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        return mapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //whitelist 필터 통과
        if(isWhitelistPath(request.getRequestURI())){
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String accessToken = null;

            //1. Cookie에서 AccessToken 추출
            Cookie[] cookies = request.getCookies();

            if(cookies!=null){
                for(Cookie cookie:cookies){
                    if("accessToken".equals(cookie.getName())){
                        accessToken = cookie.getValue();
                        break;
                    }
                }
            }
            //2. 액세스 토큰 없을 경우 예외
            if(accessToken==null) {
                throw new JwtException(JwtErrorCode.MISSING_TOKEN);
            }

            //3. Bearer 접두사 제거
            if (accessToken.startsWith(JwtUtil.BEARER_PREFIX)) {
                accessToken = accessToken.substring(JwtUtil.BEARER_PREFIX.length());
            }

            //4. 토큰 검증
            jwtUtil.validateAccessToken(accessToken);

            //5. 토큰에서 사용자 ID 추출
            Long userId = jwtUtil.getUserIdFromAccessToken(accessToken);

            //6. SecurityContext에 인증 정보 저장
            Optional<User> user = userRepository.findById(userId);
            if(!user.isPresent()){
                throw new UserException(UserErrorCode.NOT_EXISTS_USER);
            }
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.get(), null, user.get().getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.debug("JWT 인증 성공: userId={}", userId);

            // 7. 다음 필터로 전달
            filterChain.doFilter(request, response);

        } catch (UserException e) {
            log.warn("User 예외 발생: code={}, message={}",
                    e.getErrorCode().name(), e.getMessage());
            handleUserException(response, e);
        } catch (JwtException e) {
            log.warn("JWT 예외 발생: code={}, message={}",
                    e.getErrorCode().name(), e.getMessage());
            handleJwtException(response, e);
        } catch (Exception e) {
            //예상치 못한 예외
            log.error("JWT 필터에서 예상치 못한 예외 발생", e);
            handleUnexpectedException(response);
        }

    }

    //whitelist 확인
    private boolean isWhitelistPath(String requestURI) {
        return Arrays.stream(ALLOWED_URIS)
                .anyMatch(requestURI::startsWith);
    }

    //예외 처리
    private void handleUserException(HttpServletResponse response, UserException e)
            throws IOException {

        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.setContentType("application/json;charset=UTF-8");

        MessageUtils errorResponse = MessageUtils.fail(
                e.getErrorCode().name(),
                e.getErrorCode().getMessage()
        );

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }

    private void handleJwtException(HttpServletResponse response, JwtException e)
            throws IOException {

        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.setContentType("application/json;charset=UTF-8");

        MessageUtils errorResponse = MessageUtils.fail(
                e.getErrorCode().name(),
                e.getErrorCode().getMessage()
        );

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }

    private void handleUnexpectedException(HttpServletResponse response)
            throws IOException {

        response.setStatus(500);
        response.setContentType("application/json;charset=UTF-8");

        MessageUtils errorResponse = MessageUtils.fail(
                "INTERNAL_SERVER_ERROR",
                "서버 오류가 발생했습니다."
        );

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }
}
