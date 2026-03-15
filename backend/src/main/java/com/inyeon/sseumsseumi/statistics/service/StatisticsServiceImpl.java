package com.inyeon.sseumsseumi.statistics.service;

import com.inyeon.sseumsseumi.statistics.model.dto.response.GetCategoryStatisticsResponse;
import com.inyeon.sseumsseumi.statistics.model.dto.response.GetMonthlyStatisticsResponse;
import com.inyeon.sseumsseumi.transaction.repository.TransactionRepository;
import com.inyeon.sseumsseumi.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final TransactionRepository transactionRepository;

    @Override
    public List<GetMonthlyStatisticsResponse> getMonthlyStatistics(User user, LocalDate startDate, LocalDate endDate) {
        return transactionRepository.getMonthlyStatistics(user, startDate, endDate)
                .stream()
                .map(p->GetMonthlyStatisticsResponse.builder()
                        .month(p.getMonth())
                        .totalIncome(p.getTotalIncome())
                        .totalExpenditure(p.getTotalExpenditure())
                        .build())
                .toList();
    }

    @Override
    public List<GetCategoryStatisticsResponse> getCategoryStatistics(User user, LocalDate startDate, LocalDate endDate) {
        return List.of();
    }
}
