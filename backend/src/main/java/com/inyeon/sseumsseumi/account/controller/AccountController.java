package com.inyeon.sseumsseumi.account.controller;

import com.inyeon.sseumsseumi.account.service.AccountService;
import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/accounts")
public class AccountController {
    private final AccountService accountService;

    /**
     * 계좌 전체 조회
     * @return
     */
    @GetMapping("")
    public ResponseEntity<MessageUtils> getAccounts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(MessageUtils.success(accountService.getAccounts(user)));
    }
}
