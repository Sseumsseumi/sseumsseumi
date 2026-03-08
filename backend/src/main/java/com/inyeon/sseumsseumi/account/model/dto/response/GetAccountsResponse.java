package com.inyeon.sseumsseumi.account.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inyeon.sseumsseumi.account.model.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
public class GetAccountsResponse {
    private Long accountId;
    private String accountBankName;
    private String accountName;
    private String accountNumber;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp accountCreatedAt;
    private Long accountBalance;

    public static GetAccountsResponse toResponse(Account account) {
        return GetAccountsResponse.builder()
                .accountId(account.getId())
                .accountBankName(account.getBankName())
                .accountName(account.getName())
                .accountNumber(account.getNumber())
                .accountCreatedAt(account.getCreatedAt())
                .accountBalance(account.getBalance())
                .build();
    }
}
