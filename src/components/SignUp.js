import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false); // For modal pop-up
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Reset error message before new submission
    setError('');

    try {
      // Send signup request to backend API
      const response = await axios.post(
        '/users/signup',
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // If signup is successful, clear the form and show modal pop-up
      if (response.status === 201) {
        // Clear the form fields
        setUsername('');
        setEmail('');
        setPassword('');

        // Open the success modal
        setOpenModal(true);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError('Username already taken. Please try another one.');
        } else if (err.response.status === 400) {
          setError('Invalid input. Please check your details and try again.');
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  // Close the modal and redirect to login page
  const handleModalClose = () => {
    setOpenModal(false);
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', width: '300px', position: 'relative' }}>
        <span
          onClick={() => navigate('/')}
          style={{ color: '#1976d2', textAlign: 'center', cursor: 'pointer', position: 'absolute', top: -30, width: '100%' }}
        >
          Continue without creating account
        </span>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>Sign Up</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Error message display */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', borderRadius: '5px' }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#1976d2', color: '#fff' }}>
          Sign Up
        </button>
        <p style={{ color: '#fff', textAlign: 'center' }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#1976d2' }}>
            Login
          </span>
        </p>
      </form>

      {/* Modal Dialog */}
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>🎉 Account Created!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
            Congrats! Your account has been created successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleModalClose} style={{ backgroundColor: '#1976d2', color: '#fff' }}>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUp;
