import React from 'react';
import { Box, Typography, Link, IconButton, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, #1c1c1c, #000)',
        color: '#fff',
        padding: '2rem 1rem',
        width: '100%',
        borderTop: '1px solid #333',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.5rem' }}>
            ISDb
          </Typography>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} ISDb. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ marginBottom: '1rem' }}>
            <IconButton
              color="inherit"
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.2)', color: '#f5c518' } }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.2)', color: '#0077b5' } }}
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.2)', color: '#1da1f2' } }}
            >
              <TwitterIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#f5c518' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#f5c518' },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
