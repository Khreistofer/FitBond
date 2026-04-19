package com.example.fitbond.service;

import com.example.fitbond.Activity;
import com.example.fitbond.dto.FriendDTO;
import com.example.fitbond.repository.ActivityRepository;
import com.example.fitbond.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendService {

    @Autowired private FriendshipRepository friendshipRepository;
    @Autowired private ActivityRepository activityRepository;

    public List<FriendDTO> getFriends(int userId) {
        return friendshipRepository.findByUserId(userId).stream().map(f -> {
            var friend = f.getFriend();
            List<Activity> acts = activityRepository.findByUserIdOrderByStartTimeDesc(friend.getId());
            String lastActivity = acts.isEmpty() ? "No activity yet" :
                    acts.get(0).getSportType().name() + (acts.get(0).getDistanceKm() != null ?
                            " • " + acts.get(0).getDistanceKm() + "km" : "");
            String time = acts.isEmpty() ? "—" : acts.get(0).getStartTime().toString();
            // avatar = initials from username
            String[] parts = friend.getUsername().split(" ");
            String avatar = parts.length >= 2
                    ? "" + parts[0].charAt(0) + parts[1].charAt(0)
                    : friend.getUsername().substring(0, 2).toUpperCase();
            return new FriendDTO(friend.getId(), friend.getUsername(), avatar, lastActivity, time, 0);
        }).collect(Collectors.toList());
    }
}