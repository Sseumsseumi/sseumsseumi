package com.inyeon.sseumsseumi.statistics.model.dto.response;

public interface GetCategoryStatisticsProjection {
    Long getCategoryId();
    String getCategoryName();
    Long getTotalExpenditure();
}
