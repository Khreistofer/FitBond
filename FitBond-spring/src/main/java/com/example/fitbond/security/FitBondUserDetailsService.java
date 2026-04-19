package com.example.fitbond.security;

import com.example.fitbond.User;
import com.example.fitbond.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Tells Spring Security how to load a user by their email (username).
 * Used by JwtFilter to validate tokens on every protected request.
 */
@Service
public class FitBondUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public FitBondUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),          // already BCrypt-hashed in the DB
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}