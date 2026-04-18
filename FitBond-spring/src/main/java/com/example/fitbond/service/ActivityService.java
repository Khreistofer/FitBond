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
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.time.LocalDateTime;
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

    public List<Activity> getActivityFeed(int userId) {
        // Get user's own activities + all friends' activities
        List<Integer> friendIds = friendshipRepository.findByUserId(userId)
                .stream().map(f -> f.getFriend().getId()).collect(Collectors.toList());
        friendIds.add(userId); // include self

        return activityRepository.findAll().stream()
                .filter(a -> friendIds.contains(a.getUser().getId()))
                .sorted((a, b) -> b.getStartTime().compareTo(a.getStartTime()))
                .collect(Collectors.toList());
    }

    public List<WeeklyStatDTO> getWeeklyStats(int userId) {
        LocalDateTime monday = LocalDateTime.now()
                .with(java.time.DayOfWeek.MONDAY).toLocalDate().atStartOfDay();
        LocalDateTime sunday = monday.plusDays(6).withHour(23).withMinute(59);

        List<Activity> weekActivities = activityRepository
                .findByUserIdAndStartTimeBetween(userId, monday, sunday);

        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        return java.util.Arrays.stream(days).map(day -> {
            int idx = java.util.List.of(days).indexOf(day);
            double km = weekActivities.stream()
                    .filter(a -> a.getStartTime().getDayOfWeek().getValue() - 1 == idx)
                    .mapToDouble(a -> a.getDistanceKm() != null ? a.getDistanceKm() : 0)
                    .sum();
            return new WeeklyStatDTO(day, km);
        }).collect(java.util.stream.Collectors.toList());
    }

    public List<Activity> getActivitiesByUserId(int userId) {
        return activityRepository.findByUserId(userId);
    }

    public Optional<Activity> getActivityById(int id) {
        return activityRepository.findById(id);
    }
}
