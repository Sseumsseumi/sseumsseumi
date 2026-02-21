package com.inyeon.sseumsseumi.user.model.dto.request;

import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.model.entity.enums.AuthProvider;
import com.inyeon.sseumsseumi.user.model.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegistUserRequest {
    private String id;
    private String password;
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
