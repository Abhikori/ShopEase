package com.shopease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopease.model.User;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByEmail(String email);

}