package com.inyeon.sseumsseumi.user.repository;

import com.inyeon.sseumsseumi.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByLoginId(String id);
}
