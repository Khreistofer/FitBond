package com.example.fitbond;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Enumerated(EnumType.STRING)
    private Sport_Type sportType;
    private Double durationMinutes;
    private Double distanceKm;
    private Double calories;
    @Column(columnDefinition = "json")
    private String weather;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Column(length = 1000)
    private String notes;
    private LocalDateTime createdAt;

    public Activity() {}

    // === GETTERS & SETTERS ===
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Sport_Type getSportType() {
        return sportType;
    }
    public void setSportType(Sport_Type sportType) {
        this.sportType = sportType;
    }

    public Double getDurationMinutes() {
        return durationMinutes;
    }
    public void setDurationMinutes(Double durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }
    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Double getCalories() {
        return calories;
    }
    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public String getWeather() {
        return weather;
    }
    public void setWeather(String weather) {
        this.weather = weather;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}