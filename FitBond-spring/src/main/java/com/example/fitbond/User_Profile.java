package com.example.fitbond;

import jakarta.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "User_Profile")
public class User_Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    @Column(columnDefinition = "json")
    private ArrayList<String> sports;
    private int height_cm;
    private double weight_kg;
    private int age;
    @Enumerated(EnumType.STRING)
    private Level level;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    private String goal;
    public User_Profile() {}
    public User_Profile(ArrayList<String> sports_, int height_cm_, double weight_kg_, int age_, Level level_, Sex sex_, String goal_) {
        this.sports = sports_;
        this.height_cm = height_cm_;
        this.weight_kg = weight_kg_;
        this.age = age_;
        this.level = level_;
        this.sex = sex_;
        this.goal = goal_;
    }

    // === GETTERS & SETTERS ===
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public ArrayList<String> getSports() {
        return sports;
    }
    public void setSports(ArrayList<String> sports) {
        this.sports = sports;
    }

    public int getHeight() {
        return height_cm;
    }
    public void setHeight(int height_cm) {
        this.height_cm = height_cm;
    }

    public double getWeight() {
        return weight_kg;
    }
    public void setWeight(double weight_kg) {
        this.weight_kg = weight_kg;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public Level getLevel() {
        return level;
    }
    public void setLevel(Level level) {
        this.level = level;
    }

    public Sex getSex() {
        return sex;
    }
    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getGoal() {
        return goal;
    }
    public void setGoal(String goal) {
        this.goal = goal;
    }
}