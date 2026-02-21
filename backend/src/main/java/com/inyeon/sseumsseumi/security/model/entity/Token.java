package com.inyeon.sseumsseumi.security.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@AllArgsConstructor
@Builder
@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 7)
public class Token {
    @Id
    private Long id;

    @Indexed
    private String refreshToken;
}
