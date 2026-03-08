package com.inyeon.sseumsseumi.account.repository;

import com.inyeon.sseumsseumi.account.model.entity.Account;
import com.inyeon.sseumsseumi.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUser(User user);
}
