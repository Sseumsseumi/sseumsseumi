package com.inyeon.sseumsseumi.account.service;

import com.inyeon.sseumsseumi.account.model.dto.response.GetAccountsResponse;
import com.inyeon.sseumsseumi.account.model.entity.Account;
import com.inyeon.sseumsseumi.account.repository.AccountRepository;
import com.inyeon.sseumsseumi.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Override
    public List<GetAccountsResponse> getAccounts(User user) {
        //사용자 보유 계좌 전체 조회
        List<Account> accountList = accountRepository.findByUser(user);

        return accountList.stream().map(GetAccountsResponse::toResponse).collect(Collectors.toList());
    }
}
