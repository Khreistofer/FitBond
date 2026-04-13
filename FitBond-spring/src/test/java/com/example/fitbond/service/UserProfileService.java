package com.example.demo.service;
import com.example.demo.User_Profile;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository profileRepository;

    public User_Profile saveProfile(User_Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<User_Profile> getProfileByUserId(int userId) {
        return profileRepository.findById(userId);
    }
}