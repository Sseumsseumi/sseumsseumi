package com.inyeon.sseumsseumi.security.repository;

import com.inyeon.sseumsseumi.security.model.entity.Token;
import org.springframework.data.repository.CrudRepository;

public interface RedisRepository extends CrudRepository<Token,Long> {

}
