package com.example.fitbond.controller;

import com.example.fitbond.User;
import com.example.fitbond.repository.UserRepository;
import com.example.fitbond.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository  = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil         = jwtUtil;
    }

    /**
     * POST /api/auth/login
     * Body:    { "email": "...", "password": "..." }
     * Returns: { "token": "JWT...", "id": 1, "username": "...", "email": "...", "points": 0, "badges": [] }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email    = body.get("email");
        String password = body.get("password");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // Return the token AND the user fields the frontend stores in localStorage
        return ResponseEntity.ok(Map.of(
                "token",    token,
                "id",       user.getId(),
                "username", user.getUsername(),
                "email",    user.getEmail(),
                "points",   user.getPoints(),
                "badges",   user.getBadges()
        ));
    }
}
