package com.inyeon.sseumsseumi.global.config;

import com.inyeon.sseumsseumi.monitoring.config.QueryCountInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final QueryCountInterceptor queryCountInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(queryCountInterceptor).addPathPatterns("/**");
    }
}
