import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('/users/login', {
        username: username,
        password: password
      });

      // Save token securely
      localStorage.setItem('token', response.data.token); 
      
      // Set login status in localStorage
      localStorage.setItem('isLoggedIn', 'true'); 

      // Example: Set global isLoggedIn state or redirect the user
      navigate('/afterlogin'); // Navigate to after login component

    } catch (error) {
      // More specific error handling can be added here
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>Login</h2>

        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>} 

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', borderRadius: '5px' }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', borderRadius: '5px' }}
          required
        />

        <button 
          type="submit" 
          style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#1976d2', color: '#fff' }}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ color: '#fff', textAlign: 'center' }}>
          No account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: '#1976d2' }}>Create Account</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
