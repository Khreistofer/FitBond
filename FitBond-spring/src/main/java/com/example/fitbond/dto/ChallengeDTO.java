package com.example.fitbond.dto;

import java.util.List;

public class ChallengeDTO {

    private int id;
    private String title;
    private String metric;
    private String unit;
    private String ends;
    private int participants;
    private boolean joined;
    private double progress;
    private double target;
    private List<LeaderboardEntryDTO> leaderboard;

    public ChallengeDTO(int id, String title, String metric, String unit, String ends,
                        int participants, boolean joined, double progress, double target,
                        List<LeaderboardEntryDTO> leaderboard) {
        this.id = id; this.title = title; this.metric = metric; this.unit = unit;
        this.ends = ends; this.participants = participants; this.joined = joined;
        this.progress = progress; this.target = target; this.leaderboard = leaderboard;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getMetric() { return metric; }
    public String getUnit() { return unit; }
    public String getEnds() { return ends; }
    public int getParticipants() { return participants; }
    public boolean isJoined() { return joined; }
    public double getProgress() { return progress; }
    public double getTarget() { return target; }
    public List<LeaderboardEntryDTO> getLeaderboard() { return leaderboard; }

    // ─── Nested leaderboard entry ───
    public static class LeaderboardEntryDTO {
        private String name;
        private String avatar;
        private double value;

        public LeaderboardEntryDTO(String name, String avatar, double value) {
            this.name = name; this.avatar = avatar; this.value = value;
        }
        public String getName() { return name; }
        public String getAvatar() { return avatar; }
        public double getValue() { return value; }
    }
}
