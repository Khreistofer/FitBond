package com.example.fitbond.controller;

import com.example.fitbond.User;
import com.example.fitbond.dto.RegisterRequest;
import com.example.fitbond.security.JwtUtil;
import com.example.fitbond.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userService     = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil         = jwtUtil;
    }

    /**
     * POST /api/users  — PUBLIC (no token required, see SecurityConfig)
     *
     * Receives: { "firstName": "...", "lastName": "...", "email": "...", "password": "..." }
     * Returns:  { "token": "JWT...", "id": 1, "username": "...", "email": "...", "points": 0, "badges": [] }
     */
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest req) {
        User user = new User();
        user.setUsername(req.getFullName());          // "firstName lastName"
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        User saved = userService.createUser(user);
        String token = jwtUtil.generateToken(saved.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token",    token);
        response.put("id",       saved.getId());
        response.put("username", saved.getUsername());
        response.put("email",    saved.getEmail());
        response.put("points",   saved.getPoints());
        response.put("badges",   saved.getBadges());

        return ResponseEntity.ok(response);
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