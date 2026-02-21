package com.inyeon.sseumsseumi.user.model.entity;

import com.inyeon.sseumsseumi.user.model.entity.enums.AuthProvider;
import com.inyeon.sseumsseumi.user.model.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@ToString
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id; //기본키

    @Column(name = "user_login_id", length = 20)
    @NotNull
    private String loginId; //로그인 아이디

    @Column(name = "user_password")
    @NotNull
    private String password;

    @Column(name = "user_name", length = 20)
    @NotNull
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", length = 20)
    @NotNull
    private UserRole role; //권한

    @Enumerated(EnumType.STRING)
    @Column(name = "user_provider", length = 20)
    @NotNull
    private AuthProvider provider; //Oauth

    //UserDetails 구현
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
