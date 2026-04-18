package com.example.fitbond;

import jakarta.persistence.*;

@Entity
@Table(name = "User_Challenge")
public class UserChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    private double progress;
    private double target;
    private boolean joined;

    public UserChallenge() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Challenge getChallenge() { return challenge; }
    public void setChallenge(Challenge challenge) { this.challenge = challenge; }
    public double getProgress() { return progress; }
    public void setProgress(double progress) { this.progress = progress; }
    public double getTarget() { return target; }
    public void setTarget(double target) { this.target = target; }
    public boolean isJoined() { return joined; }
    public void setJoined(boolean joined) { this.joined = joined; }
}
