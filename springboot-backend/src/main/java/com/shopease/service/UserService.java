package com.shopease.service;

import com.shopease.exception.UserException;
import com.shopease.model.User;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

}
