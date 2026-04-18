package com.example.fitbond.controller;

import com.example.fitbond.User;
import com.example.fitbond.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")  // for React later
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/points")
    public ResponseEntity<User> addPoints(@PathVariable int id, @RequestParam int points) {
        return ResponseEntity.ok(userService.addPoints(id, points));
    }

    @PutMapping("/{id}/badges")
    public ResponseEntity<User> addBadge(@PathVariable int id, @RequestParam String badge) {
        return ResponseEntity.ok(userService.addBadge(id, badge));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
