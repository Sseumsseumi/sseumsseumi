package com.inyeon.sseumsseumi.user.service;

import com.inyeon.sseumsseumi.user.exception.UserException;
import com.inyeon.sseumsseumi.user.model.dto.request.RegistUserRequest;
import com.inyeon.sseumsseumi.user.model.entity.User;
import com.inyeon.sseumsseumi.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.inyeon.sseumsseumi.user.exception.UserErrorCode.ALREADY_IN_ID;
import static com.inyeon.sseumsseumi.user.exception.UserErrorCode.NOT_EXISTS_USER;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registUser(RegistUserRequest registUserRequest) {
        //아이디 중복 확인
        userRepository.findByLoginId(registUserRequest.getId())
                .ifPresent(value -> {throw new UserException(ALREADY_IN_ID);});

        //비밀번호 암호화
        registUserRequest.setPassword(passwordEncoder.encode(registUserRequest.getPassword()));

        //DB 저장
        userRepository.save(registUserRequest.toEntity());
    }

    @Override
    public User findByLoginId(String id) {
        return userRepository.findByLoginId(id).orElseThrow(()->new UserException(NOT_EXISTS_USER));
    }
}
