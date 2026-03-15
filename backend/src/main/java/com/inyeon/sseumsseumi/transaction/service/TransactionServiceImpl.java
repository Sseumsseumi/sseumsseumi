package com.inyeon.sseumsseumi.transaction.service;

import com.inyeon.sseumsseumi.account.model.dto.response.GetAccountsResponse;
import com.inyeon.sseumsseumi.transaction.model.dto.response.GetTransactionsResponse;
import com.inyeon.sseumsseumi.transaction.model.entity.Transaction;
import com.inyeon.sseumsseumi.transaction.repository.TransactionRepository;
import com.inyeon.sseumsseumi.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;

    @Override
    public List<GetTransactionsResponse> getTransactions(User user, LocalDate startDate, LocalDate endDate) {
        log.debug("user : {}, startDate : {}, endDate : {}", user,  startDate, endDate);

        //전체 계좌 날짜 범위 거래 내역 조회
        List<Transaction> transactionList = transactionRepository.findUserTransactionsByDateRange(user, startDate, endDate);

        return transactionList.stream().map(GetTransactionsResponse::toResponse).collect(Collectors.toList());
    }
}
