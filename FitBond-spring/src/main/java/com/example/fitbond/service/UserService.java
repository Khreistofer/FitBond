package com.example.fitbond.service;

import com.example.fitbond.User;
import com.example.fitbond.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        user.setCreated_at(LocalDateTime.now());
        user.setUpdated_at(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User addPoints(int userId, int pointsToAdd) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoints(user.getPoints() + pointsToAdd);
        user.setUpdated_at(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User addBadge(int userId, String badge) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getBadges().contains(badge)) {
            user.getBadges().add(badge);
            user.setUpdated_at(LocalDateTime.now());
            userRepository.save(user);
        }
        return user;
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}