package com.isdb.ServiceImpl;

import com.isdb.Entity.User;
import com.isdb.Repository.UserRepository;
import com.isdb.Service.UserService;
import com.isdb.dto.UserDTO;
//import org.springframework.security.crypto.password.PasswordEncoder;
 

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder; // To encode passwords

    @Override
    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User createUser(UserDTO userDTO) {
        if (isUsernameTaken(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        // Create a new User object and encode the password
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // Encrypt password

        // Save the user to the database
        return userRepository.save(user);
    }
    
    
    @Override
    public Optional<UserDTO> login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Compare provided password with the stored password
            if (user.getPassword().equals(password)) {
                return Optional.of(new UserDTO(user.getUsername(), user.getEmail(), null)); // Don't return the password
            }
        }
        return Optional.empty(); // Return empty if authentication fails
    }


    @Override
    public UserDTO register(UserDTO userDTO, String password) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(password);
        userRepository.save(user);
        return new UserDTO(user.getUsername(), user.getEmail(), password);
    }
}
