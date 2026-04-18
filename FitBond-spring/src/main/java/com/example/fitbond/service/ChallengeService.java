package com.example.fitbond.service;

import com.example.fitbond.Challenge;
import com.example.fitbond.UserChallenge;
import com.example.fitbond.dto.ChallengeDTO;
import com.example.fitbond.repository.ChallengeRepository;
import com.example.fitbond.repository.UserChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengeService {

    @Autowired private ChallengeRepository challengeRepository;
    @Autowired private UserChallengeRepository userChallengeRepository;

    // Get all challenges with current user's status
    public List<ChallengeDTO> getAllChallenges(int userId) {
        return challengeRepository.findAll().stream().map(c -> buildDTO(c, userId))
                .collect(Collectors.toList());
    }

    // Join a challenge
    public ChallengeDTO joinChallenge(int userId, int challengeId, double target) {
        // Check if already joined
        Optional<UserChallenge> existing = userChallengeRepository
                .findByUserIdAndChallengeId(userId, challengeId);
        if (existing.isPresent()) {
            existing.get().setJoined(true);
            userChallengeRepository.save(existing.get());
        } else {
            Challenge challenge = challengeRepository.findById(challengeId)
                    .orElseThrow(() -> new RuntimeException("Challenge not found"));

            UserChallenge uc = new UserChallenge();
            // We need the User — reuse UserRepository via a lookup
            com.example.fitbond.User user = new com.example.fitbond.User();
            user.setId(userId);
            uc.setUser(user);
            uc.setChallenge(challenge);
            uc.setProgress(0);
            uc.setTarget(target);
            uc.setJoined(true);
            userChallengeRepository.save(uc);
        }
        return buildDTO(challengeRepository.findById(challengeId).get(), userId);
    }

    // Update progress
    public ChallengeDTO updateProgress(int userId, int challengeId, double progress) {
        UserChallenge uc = userChallengeRepository
                .findByUserIdAndChallengeId(userId, challengeId)
                .orElseThrow(() -> new RuntimeException("User not in this challenge"));
        uc.setProgress(progress);
        userChallengeRepository.save(uc);
        return buildDTO(challengeRepository.findById(challengeId).get(), userId);
    }

    // ─── Helper: build DTO from Challenge + userId ───
    private ChallengeDTO buildDTO(Challenge c, int userId) {
        List<UserChallenge> allEntries = userChallengeRepository.findByChallengeId(c.getId());

        Optional<UserChallenge> myEntry = allEntries.stream()
                .filter(uc -> uc.getUser().getId() == userId)
                .findFirst();

        List<ChallengeDTO.LeaderboardEntryDTO> leaderboard = allEntries.stream()
                .sorted((a, b) -> Double.compare(b.getProgress(), a.getProgress()))
                .map(uc -> {
                    String username = uc.getUser().getUsername();
                    String[] parts = username.split(" ");
                    String avatar = parts.length >= 2
                            ? "" + parts[0].charAt(0) + parts[1].charAt(0)
                            : username.substring(0, Math.min(2, username.length())).toUpperCase();
                    return new ChallengeDTO.LeaderboardEntryDTO(username, avatar, uc.getProgress());
                })
                .collect(Collectors.toList());

        return new ChallengeDTO(
                c.getId(),
                c.getTitle(),
                c.getMetric(),
                c.getUnit(),
                c.getEndDate().toString(),
                allEntries.size(),
                myEntry.map(UserChallenge::isJoined).orElse(false),
                myEntry.map(UserChallenge::getProgress).orElse(0.0),
                myEntry.map(UserChallenge::getTarget).orElse(0.0),
                leaderboard
        );
    }
}
