package com.inyeon.sseumsseumi.transaction.model.entity;

import com.inyeon.sseumsseumi.account.model.entity.Account;
import com.inyeon.sseumsseumi.category.model.entity.Category;
import com.inyeon.sseumsseumi.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="account_transactions")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@ToString
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id; //기본키

    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @Column(name = "transaction_date")
    @NotNull
    private LocalDate date;

    @Column(name = "transaction_time")
    @NotNull
    private LocalTime time;

    @Column(name = "transaction_summary", length = 100)
    private String summary; //적요

    @Column(name = "transaction_withdrawal")
    @NotNull
    private Long withdrawal; //출금

    @Column(name = "transaction_deposit")
    @NotNull
    private Long deposit; //입금

    @Column(name = "transaction_content")
    @NotNull
    private String content; //내용

    @Column(name = "transaction_balance")
    @NotNull
    private Long balance; //잔액

    @Column(name = "transaction_branch", length = 50)
    @NotNull
    private Long branch; //거래점
}
