package com.example.demo.repository;
import com.example.fitbond.Activity;
import com.example.fitbond.Sport_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    // === BASIC: activities of one user ===
    List<Activity> findByUserId(int userId);

    // === DASHBOARD: recent activities (newest first) ===
    List<Activity> findByUserIdOrderByStartTimeDesc(int userId);

    // === FILTER by sport type ===
    List<Activity> findByUserIdAndSportType(int userId, Sport_Type sportType);

    // === DATE RANGE (for charts: last week, last month, etc.) ===
    List<Activity> findByUserIdAndStartTimeBetween(int userId, LocalDateTime start, LocalDateTime end);

    // === STATISTICS QUERIES (used in dashboard) ===
    // Total distance run by a user
    @Query("SELECT COALESCE(SUM(a.distanceKm), 0) FROM Activity a WHERE a.user.id = :userId")
    Double getTotalDistanceByUserId(@Param("userId") int userId);

    // Total calories burned by a user
    @Query("SELECT COALESCE(SUM(a.calories), 0) FROM Activity a WHERE a.user.id = :userId")
    Double getTotalCaloriesByUserId(@Param("userId") int userId);

    // Number of activities logged
    @Query("SELECT COUNT(a) FROM Activity a WHERE a.user.id = :userId")
    int countActivitiesByUserId(@Param("userId") int userId);

    // Average duration per activity
    @Query("SELECT COALESCE(AVG(a.durationMinutes), 0) FROM Activity a WHERE a.user.id = :userId")
    Double getAverageDurationByUserId(@Param("userId") int userId);

    // Activities per month (for progress chart)
    @Query("SELECT FUNCTION('DATE_FORMAT', a.startTime, '%Y-%m') as month, COUNT(a) as count " +
            "FROM Activity a WHERE a.user.id = :userId " +
            "GROUP BY FUNCTION('DATE_FORMAT', a.startTime, '%Y-%m') " +
            "ORDER BY month")
    List<Object[]> getActivitiesPerMonth(@Param("userId") int userId);

    // Last 30 days total distance (streak / goal tracking)
    @Query("SELECT COALESCE(SUM(a.distanceKm), 0) FROM Activity a " +
            "WHERE a.user.id = :userId AND a.startTime >= :startDate")
    Double getDistanceLast30Days(@Param("userId") int userId, @Param("startDate") LocalDateTime startDate);


}