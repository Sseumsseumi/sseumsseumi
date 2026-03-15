package com.inyeon.sseumsseumi.transaction.repository;

import com.inyeon.sseumsseumi.statistics.model.dto.response.GetCategoryStatisticsProjection;
import com.inyeon.sseumsseumi.statistics.model.dto.response.GetMonthlyStatisticsProjection;
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
    List<Transaction> findUserTransactionsByDateRange(User user, LocalDate startDate, LocalDate endDate); //사용자별 전체 계좌 거래 내역 조회

    @Query("""
        SELECT 
            FUNCTION('DATE_FORMAT', t.date, '%Y-%m') AS month,
            SUM(t.deposit) AS totalIncome,
            SUM(t.withdrawal) AS totalExpenditure
        FROM Transaction t
        JOIN t.account a
        WHERE a.user = :user
        AND t.date BETWEEN :startDate AND :endDate
        GROUP BY FUNCTION('DATE_FORMAT', t.date, '%Y-%m')
        ORDER BY FUNCTION('DATE_FORMAT', t.date, '%Y-%m')
    """)
    List<GetMonthlyStatisticsProjection> getMonthlyStatistics(User user, LocalDate startDate, LocalDate endDate); //월별 소비 통계

    @Query("""
        SELECT
            c.id AS categoryId,
            c.name AS categoryName,
            SUM(t.withdrawal) AS totalExpenditure
        FROM Transaction t
        JOIN t.account a
        JOIN t.category c
        WHERE a.user = :user
        AND t.date BETWEEN :startDate AND :endDate
        GROUP BY c.id, c.name
        ORDER BY SUM(t.withdrawal) DESC
    """)
    List<GetCategoryStatisticsProjection> getCategoryStatistics(User user, LocalDate startDate, LocalDate endDate); //카테고리별 소비 통계
}
