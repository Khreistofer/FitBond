package com.example.fitbond.dto;

/**
 * DTO for POST /api/users
 * Matches exactly what Auth.jsx sends:
 * { firstName, lastName, email, password }
 */
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // Getters & Setters
    public String getFirstName()              { return firstName; }
    public void   setFirstName(String v)      { this.firstName = v; }

    public String getLastName()               { return lastName; }
    public void   setLastName(String v)       { this.lastName = v; }

    public String getEmail()                  { return email; }
    public void   setEmail(String v)          { this.email = v; }

    public String getPassword()               { return password; }
    public void   setPassword(String v)       { this.password = v; }

    /** Convenience: build username as "firstName lastName" */
    public String getFullName() {
        return (firstName + " " + lastName).trim();
    }
}