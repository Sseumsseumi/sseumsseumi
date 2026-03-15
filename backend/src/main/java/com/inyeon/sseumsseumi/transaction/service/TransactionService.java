package com.inyeon.sseumsseumi.transaction.service;

import com.inyeon.sseumsseumi.transaction.model.dto.response.GetTransactionsResponse;
import com.inyeon.sseumsseumi.user.model.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    List<GetTransactionsResponse> getTransactions(User user, LocalDate startDate, LocalDate endDate);
}
