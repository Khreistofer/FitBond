package com.example.fitbond.dto;

public class WeeklyStatDTO {
    private String day;
    private double km;

    public WeeklyStatDTO(String day, double km) {
        this.day = day;
        this.km = km;
    }
    public String getDay() { return day; }
    public double getKm() { return km; }
}