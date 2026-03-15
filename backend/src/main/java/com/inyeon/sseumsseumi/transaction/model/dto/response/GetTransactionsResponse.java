package com.inyeon.sseumsseumi.transaction.model.dto.response;

import com.inyeon.sseumsseumi.transaction.model.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
public class GetTransactionsResponse {
    private Long transactionId;
    private LocalDate transactionDate;
    private LocalTime transactionTime;
    private Long transactionWithdrawal; //출금
    private Long transactionDeposit; //입금
    private String transactionContent; //내용
    private String transactionBranch; //거래점
    private String categoryName;

    public static GetTransactionsResponse toResponse(Transaction transaction) {
        return GetTransactionsResponse.builder()
                .transactionId(transaction.getId())
                .transactionDate(transaction.getDate())
                .transactionTime(transaction.getTime())
                .transactionWithdrawal(transaction.getWithdrawal())
                .transactionDeposit(transaction.getDeposit())
                .transactionContent(transaction.getContent())
                .transactionBranch(transaction.getBranch())
                .categoryName(transaction.getCategory().getName())
                .build();
    }
}
