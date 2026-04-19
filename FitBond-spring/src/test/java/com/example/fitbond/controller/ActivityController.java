package com.example.fitbond.controller;
import com.example.fitbond.Activity;
import com.example.fitbond.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {

    @Autowired
    private ActivityService activityService;
    @PostMapping
    public ResponseEntity<Activity> createActivity(
            @RequestBody Activity activity,
            @RequestParam int userId,
            @RequestParam double latitude,
            @RequestParam double longitude) {

        Activity saved = activityService.createActivity(activity, userId, latitude, longitude);
        return ResponseEntity.ok(saved);
    }
    @GetMapping("/user/{userId}")
    public List<Activity> getUserActivities(@PathVariable int userId) {
        return activityService.getActivitiesByUserId(userId);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivity(@PathVariable int id) {
        return activityService.getActivityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
