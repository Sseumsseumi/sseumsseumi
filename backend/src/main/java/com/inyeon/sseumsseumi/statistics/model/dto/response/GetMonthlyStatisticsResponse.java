package com.inyeon.sseumsseumi.statistics.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
public class GetMonthlyStatisticsResponse {
    private String month;
    private Long totalIncome; //총 수입
    private Long totalExpenditure; //총 지출
}
