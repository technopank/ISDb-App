package com.isdb.Controller;

import com.isdb.Entity.User;
import com.isdb.Service.UserService;
import com.isdb.dto.LoginRequestDTO;
import com.isdb.dto.RegisterRequestDTO;
import com.isdb.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users") // Add a base path for clarity
public class UserController {

    @Autowired
    private UserService userService;

    // Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) {
        try {
            // Check if the username is already taken
            if (userService.isUsernameTaken(userDTO.getUsername())) {
                return new ResponseEntity<>("Username already taken", HttpStatus.CONFLICT);
            }

            // Create the user
            User user = userService.createUser(userDTO);
            return new ResponseEntity<>(user, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            // Return conflict if the username is taken
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            // Log the error and return a generic bad request message
            e.printStackTrace(); // Consider using a logger for better log management
            return new ResponseEntity<>("Failed to create user", HttpStatus.BAD_REQUEST);
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Optional<UserDTO> user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get()); // Return the user details upon successful login
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        UserDTO userDTO = new UserDTO(registerRequest.getUsername(), registerRequest.getEmail(), null);
        UserDTO registeredUser = userService.register(userDTO, registerRequest.getPassword());
        return ResponseEntity.ok(registeredUser);
    }
}
