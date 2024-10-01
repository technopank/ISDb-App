package com.isdb.Service;


import java.util.Optional;

import com.isdb.Entity.User;
import com.isdb.dto.UserDTO;

public interface UserService {
	
    boolean isUsernameTaken(String username);
    
    User createUser(UserDTO userDTO);
    
    Optional<UserDTO> login(String username, String password);
    
    UserDTO register(UserDTO userDTO, String password);

}
