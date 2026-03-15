package com.inyeon.sseumsseumi.transaction.controller;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.transaction.service.TransactionService;
import com.inyeon.sseumsseumi.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    /**
     * 계좌 거래 내역 전체 조회 (연, 월)
     * @return
     */
    @GetMapping("")
    public ResponseEntity<MessageUtils> getTransactions(@AuthenticationPrincipal User user,
                                                        @RequestParam LocalDate startDate,
                                                        @RequestParam LocalDate endDate) {
        return ResponseEntity.ok().body(MessageUtils.success(transactionService.getTransactions(user, startDate, endDate)));
    }
}
