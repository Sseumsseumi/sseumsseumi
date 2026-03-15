package com.inyeon.sseumsseumi.transaction.repository;

import com.inyeon.sseumsseumi.transaction.model.entity.Transaction;
import com.inyeon.sseumsseumi.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("""
            SELECT t
            FROM Transaction t
            JOIN t.account a
            WHERE a.user = :user
            AND t.date BETWEEN :startDate AND :endDate
            ORDER BY t.date DESC, t.time DESC
            """)
    List<Transaction> findUserTransactionsByDateRange(User user, LocalDate startDate, LocalDate endDate);
}
