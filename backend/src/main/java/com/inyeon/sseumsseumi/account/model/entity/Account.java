package com.inyeon.sseumsseumi.account.model.entity;

import com.inyeon.sseumsseumi.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;

@Entity
@Table(name="account")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@ToString
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id; //기본키

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name = "account_bank_name", length = 30)
    @NotNull
    private String bankName; //은행명

    @Column(name = "account_name", length = 50)
    @NotNull
    private String name; //계좌명

    @Column(name = "account_number", length = 30)
    @NotNull
    private String number; //계좌번호

    @Column(name = "account_created_at")
    @NotNull
    private Timestamp createdAt; //신규일자

    @Column(name = "account_balance")
    @ColumnDefault("0")
    @NotNull
    private Long balance; //잔액
}
