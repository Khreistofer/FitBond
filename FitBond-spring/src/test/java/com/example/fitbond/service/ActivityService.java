package com.example.fitbond.service;

import com.example.fitbond.Activity;
import com.example.fitbond.Sport_Type;
import com.example.fitbond.User;
import com.example.fitbond.dto.WeeklyStatDTO;
import com.example.fitbond.repository.ActivityRepository;
import com.example.fitbond.repository.FriendshipRepository;
import com.example.fitbond.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;

    // RestTemplate replaces WebClient — no WebFlux dependency needed
    private final RestTemplate restTemplate = new RestTemplate();

    // Simple MET values for calorie calculation
    private double getMET(Sport_Type sport) {
        return switch (sport) {
            case ENDURANCE        -> 8.0;
            case INDOOR_TRAINING  -> 6.0;
            case OUTDOOR_TRAINING -> 7.0;
            case TEAM_COURT       -> 7.5;
            case MIND_BODY        -> 3.5;
            case ALTERNATIVE      -> 5.0;
        };
    }

    public Activity createActivity(Activity activity, int userId, double latitude, double longitude) {

        // 1. Load the real User from database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        activity.setUser(user);

        // 2. Calculate calories automatically
        double durationHours = activity.getDurationMinutes() / 60.0;
        double met = getMET(activity.getSportType());
        double weightKg = (user.getProfile() != null) ? user.getProfile().getWeight() : 70.0;
        double calories = met * weightKg * durationHours;
        activity.setCalories(Math.round(calories * 10.0) / 10.0);

        // 3. Fetch weather via open-meteo (plain HTTP, no WebFlux)
        String weatherJson = fetchWeather(latitude, longitude);
        activity.setWeather(weatherJson);

        // 4. Set timestamp
        activity.setCreatedAt(LocalDateTime.now());

        return activityRepository.save(activity);
    }

    private String fetchWeather(double lat, double lon) {
        try {
            String url = "https://api.open-meteo.com/v1/forecast"
                    + "?latitude=" + lat
                    + "&longitude=" + lon
                    + "&current_weather=true";
            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            return "{\"error\": \"Weather API unavailable\"}";
        }
    }

    public List<Activity> getActivityFeed(int userId) {
        // Collect IDs of friends + self
        List<Integer> friendIds = friendshipRepository.findByUserId(userId)
                .stream()
                .map(f -> f.getFriend().getId())
                .collect(Collectors.toList());
        friendIds.add(userId);

        return activityRepository.findAll().stream()
                .filter(a -> friendIds.contains(a.getUser().getId()))
                .sorted((a, b) -> b.getStartTime().compareTo(a.getStartTime()))
                .collect(Collectors.toList());
    }

    public List<WeeklyStatDTO> getWeeklyStats(int userId) {
        LocalDateTime monday = LocalDateTime.now()
                .with(java.time.DayOfWeek.MONDAY)
                .toLocalDate()
                .atStartOfDay();
        LocalDateTime sunday = monday.plusDays(6).withHour(23).withMinute(59);

        List<Activity> weekActivities = activityRepository
                .findByUserIdAndStartTimeBetween(userId, monday, sunday);

        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        return Arrays.stream(days).map(day -> {
            int idx = List.of(days).indexOf(day);
            double km = weekActivities.stream()
                    .filter(a -> a.getStartTime().getDayOfWeek().getValue() - 1 == idx)
                    .mapToDouble(a -> a.getDistanceKm() != null ? a.getDistanceKm() : 0)
                    .sum();
            return new WeeklyStatDTO(day, km);
        }).collect(Collectors.toList());
    }

    public List<Activity> getActivitiesByUserId(int userId) {
        return activityRepository.findByUserId(userId);
    }

    public Optional<Activity> getActivityById(int id) {
        return activityRepository.findById(id);
    }
}