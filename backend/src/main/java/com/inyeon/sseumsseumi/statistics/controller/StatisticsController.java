package com.inyeon.sseumsseumi.statistics.controller;

import com.inyeon.sseumsseumi.global.utils.MessageUtils;
import com.inyeon.sseumsseumi.statistics.service.StatisticsService;
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
@RequestMapping("/v1/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/monthly")
    public ResponseEntity<MessageUtils> getMonthlyStatistics(@AuthenticationPrincipal User user,
                                                             @RequestParam LocalDate startDate,
                                                             @RequestParam LocalDate endDate) {
        return ResponseEntity.ok().body(MessageUtils.success(statisticsService.getMonthlyStatistics(user, startDate, endDate)));
    }

    @GetMapping("/category")
    public ResponseEntity<MessageUtils> getCategoryStatistics(@AuthenticationPrincipal User user,
                                                              @RequestParam LocalDate startDate,
                                                              @RequestParam LocalDate endDate) {
        return ResponseEntity.ok().body(MessageUtils.success(statisticsService.getCategoryStatistics(user, startDate, endDate)));
    }
}
