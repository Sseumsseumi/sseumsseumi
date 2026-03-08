package com.inyeon.sseumsseumi.account.service;

import com.inyeon.sseumsseumi.account.model.dto.response.GetAccountsResponse;
import com.inyeon.sseumsseumi.user.model.entity.User;

import java.util.List;

public interface AccountService {
    List<GetAccountsResponse> getAccounts(User user);
}
