package com.inyeon.sseumsseumi.user.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
public class GetUserInfoResponse {
    private Long userId;
    private String userName;
}
