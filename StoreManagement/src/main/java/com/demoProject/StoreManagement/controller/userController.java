package com.demoProject.StoreManagement.controller;


import com.demoProject.StoreManagement.Model.Users;
import com.demoProject.StoreManagement.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class userController {

    @Autowired
    private userService service;

    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        return service.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return service.verify(user);
    }
}
