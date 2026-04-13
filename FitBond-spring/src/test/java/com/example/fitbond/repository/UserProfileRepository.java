package com.example.demo.repository;

import com.example.demo.User_Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<User_Profile, Integer> {
}