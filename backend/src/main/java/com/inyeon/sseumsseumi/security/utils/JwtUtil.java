package com.inyeon.sseumsseumi.security.utils;

import com.inyeon.sseumsseumi.security.config.JwtProperties;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Service
public class JwtUtil {
    private final JwtProperties jwtProperties;
    private SecretKey accessSecretKey;
    private SecretKey refreshSecretKey;
    private static final ZoneId zoneId = ZoneId.of("Asia/Seoul");
    public static final String BEARER_PREFIX = "Bearer_";


    //생성자 호출 → 의존성 주입 → init 메서드 실행
    @PostConstruct
    public void init() {
        accessSecretKey = Keys.hmacShaKeyFor(jwtProperties.getAccess().getBytes(StandardCharsets.UTF_8));
        refreshSecretKey = Keys.hmacShaKeyFor(jwtProperties.getRefresh().getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 발행 시간
     * @return
     */
    public Date getIssuedDate() {
        return Date.from(ZonedDateTime.now(zoneId).toInstant());
    }

    /**
     * 만료 시간
     * @param period
     * @return
     */
    public Date getExpireDate(Long period){
        //만료 시간 = 발행 시간 + period
        return Date.from(ZonedDateTime.now(zoneId).plus(Duration.ofMillis(period)).toInstant());
    }

    /**
     * 액세스 토큰 생성
     * @param id
     * @return
     */
    public String generateAccessToken(Long id){
        return BEARER_PREFIX+ Jwts.builder()
                .subject(String.valueOf(id))
                .issuedAt(getIssuedDate())
                .expiration(getExpireDate(jwtProperties.getAccessTime()))
                .signWith(accessSecretKey)
                .compact();
    }

    /**
     * 리프레쉬 토큰 생성
     * @param id
     * @return
     */
    public String generateRefreshToken(Long id){
        return BEARER_PREFIX+ Jwts.builder()
                .subject(String.valueOf(id))
                .issuedAt(getIssuedDate())
                .expiration(getExpireDate(jwtProperties.getRefreshTime()))
                .signWith(refreshSecretKey)
                .compact();
    }
}
