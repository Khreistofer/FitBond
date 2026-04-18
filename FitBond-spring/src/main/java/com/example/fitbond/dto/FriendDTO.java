package com.example.fitbond.dto;

public class FriendDTO {
    private int id;
    private String name;
    private String avatar;
    private String lastActivity;
    private String time;
    private int points;

    public FriendDTO(int id, String name, String avatar, String lastActivity, String time, int points) {
        this.id = id; this.name = name; this.avatar = avatar;
        this.lastActivity = lastActivity; this.time = time; this.points = points;
    }
    public int getId() { return id; }
    public String getName() { return name; }
    public String getAvatar() { return avatar; }
    public String getLastActivity() { return lastActivity; }
    public String getTime() { return time; }
    public int getPoints() { return points; }
}