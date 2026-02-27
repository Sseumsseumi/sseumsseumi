package com.inyeon.sseumsseumi.user.service;

import com.inyeon.sseumsseumi.user.model.dto.request.RegistUserRequest;
import com.inyeon.sseumsseumi.user.model.entity.User;

public interface UserService {
    void registUser(RegistUserRequest registUserRequest); //회원가입
    User findById(Long id);
    User findByLoginId(String id); //회원 찾기
}
