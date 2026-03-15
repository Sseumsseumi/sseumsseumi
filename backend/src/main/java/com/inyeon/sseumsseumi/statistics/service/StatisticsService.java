package com.inyeon.sseumsseumi.statistics.service;

import com.inyeon.sseumsseumi.statistics.model.dto.response.GetCategoryStatisticsResponse;
import com.inyeon.sseumsseumi.statistics.model.dto.response.GetMonthlyStatisticsResponse;
import com.inyeon.sseumsseumi.user.model.entity.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

public interface StatisticsService {
    List<GetMonthlyStatisticsResponse> getMonthlyStatistics(User user, LocalDate startDate, LocalDate endDate);
    List<GetCategoryStatisticsResponse> getCategoryStatistics(User user, LocalDate startDate, LocalDate endDate);
}
