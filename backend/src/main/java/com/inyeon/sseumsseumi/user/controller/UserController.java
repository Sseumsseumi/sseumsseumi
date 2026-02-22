package com.inyeon.sseumsseumi.user.controller;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.user.model.dto.request.RegistUserRequest;
import com.inyeon.sseumsseumi.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/regist")
    public ResponseEntity<MessageUtils> registUser(@Valid @RequestBody RegistUserRequest registUserRequest){
        userService.registUser(registUserRequest);
        return ResponseEntity.ok().body(MessageUtils.success());
    }
}
