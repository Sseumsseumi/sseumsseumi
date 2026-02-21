package com.inyeon.sseumsseumi.security.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "spring.jwt") //application.yml에서 값 읽어와 객체 생성
public class JwtProperties {
    private String access;
    private String refresh;
    private Long accessTime;
    private Long refreshTime;
}
