package com.inyeon.sseumsseumi.statistics.model.dto.response;

public interface GetMonthlyStatisticsProjection {
    String getMonth();
    Long getTotalIncome();
    Long getTotalExpenditure();
}
