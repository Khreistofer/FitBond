package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private User_Profile profile;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities = new ArrayList<>();
    public User() {}
    public User(String username_, String email_, LocalDateTime created_at_, LocalDateTime updated_at_) {
        this.username = username_;
        this.email = email_;
        this.created_at = created_at_;
        this.updated_at = updated_at_;
    }
    // === GETTERS & SETTERS ===
    public int getId() {
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public LocalDateTime getCreated_at() {
        return created_at;
    }
    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public User_Profile getProfile() {
        return profile;
    }
    public void setProfile(User_Profile profile) {
        this.profile = profile;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}
