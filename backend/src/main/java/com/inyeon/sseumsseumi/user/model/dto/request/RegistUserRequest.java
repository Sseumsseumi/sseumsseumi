package com.inyeon.sseumsseumi.user.model.dto.request;

import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.model.entity.enums.AuthProvider;
import com.inyeon.sseumsseumi.user.model.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegistUserRequest {
    @NotNull
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,20}$",
            message = "INVALID_LOGIN_ID_FORMAT"
    )
    private String id;
    @NotNull
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+]).{8,16}$",
            message = "INVALID_PASSWORD_FORMAT"
    )
    private String password;
    @NotNull
    private String name;

    public User toEntity(){
        return User.builder()
                .id(null)
                .loginId(id)
                .password(password)
                .name(name)
                .role(UserRole.ROLE_USER)
                .provider(AuthProvider.LOCAL)
                .build();
    }
}
