package com.example.demo.service;
import com.example.demo.Activity;
import com.example.demo.Sport_Type;
import com.example.demo.User;
import com.example.demo.repository.ActivityRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserRepository userRepository;

    private final WebClient webClient = WebClient.create("https://api.open-meteo.com");

    // Simple MET values for calorie calculation
    private double getMET(Sport_Type sport) {
        return switch (sport) {
            case ENDURANCE       -> 8.0;
            case INDOOR_TRAINING -> 6.0;
            case OUTDOOR_TRAINING-> 7.0;
            case TEAM_COURT      -> 7.5;
            case MIND_BODY       -> 3.5;
            case ALTERNATIVE     -> 5.0;
        };
    }

    // === NEW CLEAN VERSION ===
    public Activity createActivity(Activity activity, int userId, double latitude, double longitude) {

        // 1. Load the real User from database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        activity.setUser(user);

        // 2. Calculate calories automatically
        double durationHours = activity.getDurationMinutes() / 60.0;
        double met = getMET(activity.getSportType());
        double calories = met * user.getProfile().getWeight() * durationHours;
        activity.setCalories(Math.round(calories * 10.0) / 10.0);

        // 3. Fetch weather (open-meteo)
        String weatherJson = fetchWeather(latitude, longitude);
        activity.setWeather(weatherJson);

        // 4. Set timestamp
        activity.setCreatedAt(LocalDateTime.now());

        return activityRepository.save(activity);
    }

    private String fetchWeather(double lat, double lon) {
        try {
            Mono<String> response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1/forecast")
                            .queryParam("latitude", lat)
                            .queryParam("longitude", lon)
                            .queryParam("current_weather", true)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class);

            return response.block();
        } catch (Exception e) {
            return "{\"error\": \"Weather API unavailable\"}";
        }
    }

    public List<Activity> getActivitiesByUserId(int userId) {
        return activityRepository.findByUserId(userId);
    }

    public Optional<Activity> getActivityById(int id) {
        return activityRepository.findById(id);
    }
}
