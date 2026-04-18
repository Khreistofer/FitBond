package com.example.fitbond.repository;

import com.example.fitbond.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserChallengeRepository extends JpaRepository<UserChallenge, Integer> {
    List<UserChallenge> findByChallengeId(int challengeId);
    List<UserChallenge> findByUserId(int userId);
    Optional<UserChallenge> findByUserIdAndChallengeId(int userId, int challengeId);
}
