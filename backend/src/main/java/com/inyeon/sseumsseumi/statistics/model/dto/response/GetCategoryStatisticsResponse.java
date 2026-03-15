package com.inyeon.sseumsseumi.statistics.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
public class GetCategoryStatisticsResponse {
    private Long categoryId;
    private String categoryName;
    private Long totalExpenditure;
}
