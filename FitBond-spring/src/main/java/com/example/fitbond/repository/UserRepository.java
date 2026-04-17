package com.example.demo.repository;

import com.example.fitbond.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // === BASIC SEARCH (needed for login + friend search) ===
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    // === FRIEND SYSTEM: search users by username (partial match) ===
    List<User> findByUsernameContainingIgnoreCase(String usernameFragment);
    // === OPTIONAL: get all users except current one (for friend suggestions) ===
    List<User> findByIdNot(int userId);
}