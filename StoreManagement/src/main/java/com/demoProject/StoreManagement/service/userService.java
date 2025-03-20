package com.demoProject.StoreManagement.service;

import com.demoProject.StoreManagement.Model.Users;
import com.demoProject.StoreManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    //create bycript onbject
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users registerUser(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String verify(Users user) {
        Authentication auth =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword()));

        if(auth.isAuthenticated())
//            return user.getUserName();
            return jwtService.generateToken(user.getUserName());

        return "failed";
    }
}
