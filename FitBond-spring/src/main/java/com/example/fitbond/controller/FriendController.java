package com.example.fitbond.controller;

import com.example.fitbond.dto.FriendDTO;
import com.example.fitbond.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
@CrossOrigin(origins = "http://localhost:5173")
public class FriendController {

    @Autowired private FriendService friendService;

    @GetMapping
    public List<FriendDTO> getFriends(@RequestParam int userId) {
        return friendService.getFriends(userId);
    }
}