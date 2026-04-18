package com.example.fitbond.controller;

import com.example.fitbond.User_Profile;
import com.example.fitbond.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    @Autowired
    private UserProfileService profileService;

    @PostMapping
    public ResponseEntity<User_Profile> createProfile(@RequestBody User_Profile profile) {
        return ResponseEntity.ok(profileService.saveProfile(profile));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User_Profile> getProfile(@PathVariable int userId) {
        return profileService.getProfileByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}