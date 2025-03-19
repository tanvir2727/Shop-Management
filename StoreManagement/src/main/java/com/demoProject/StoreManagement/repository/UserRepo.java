package com.demoProject.StoreManagement.repository;

import com.demoProject.StoreManagement.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {



    Users getByUserName(String username);
}
