package com.example.fitbond.controller;

import com.example.fitbond.dto.ChallengeDTO;
import com.example.fitbond.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin(origins = "http://localhost:5173")
public class ChallengeController {

    @Autowired private ChallengeService challengeService;

    // Get all challenges for a user
    @GetMapping
    public List<ChallengeDTO> getChallenges(@RequestParam int userId) {
        return challengeService.getAllChallenges(userId);
    }

    // Join a challenge
    @PostMapping("/{challengeId}/join")
    public ChallengeDTO joinChallenge(
            @PathVariable int challengeId,
            @RequestParam int userId,
            @RequestParam double target) {
        return challengeService.joinChallenge(userId, challengeId, target);
    }

    // Update your progress in a challenge
    @PutMapping("/{challengeId}/progress")
    public ChallengeDTO updateProgress(
            @PathVariable int challengeId,
            @RequestParam int userId,
            @RequestParam double progress) {
        return challengeService.updateProgress(userId, challengeId, progress);
    }
}
