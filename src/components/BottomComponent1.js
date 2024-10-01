import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import the play icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for data fetching
import API from '../Api';

const BottomComponent1 = () => {
  const [items, setItems] = useState([]); // State to store items fetched from the database
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch items from the 'discover' table in the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/discover`); // Replace with your actual API endpoint
        setItems(response.data); // Update state with the fetched items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems(); // Fetch items when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCardClick = (songId) => {
    navigate(`/afterloginsongdetails/${songId}`); // Navigate to the song details page using the song's ID
  };

  const handlePlayClick = (song) => {
    if (song.youtubeUrl) {
      window.open(song.youtubeUrl, '_blank'); // Open the YouTube link in a new tab
    } else {
      alert('No YouTube URL available for this item');
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: '3rem',
        paddingBottom: '5rem',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '1.5rem', color: '#fff', fontWeight: 'bold' }}>
        Discover More
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: { xs: 2, sm: 3 },
          padding: '16px 24px',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          marginBottom: '4rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {items.map((song) => (
          <Card
            key={song.id}
            onClick={() => handleCardClick(song.id)} // Handle click to navigate to song details page
            sx={{
              width: { xs: 120, sm: 140, md: 160 },
              height: { xs: 280, sm: 300, md: 320 },
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#222',
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              padding: '16px',
              flexShrink: 0,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                width: '100%',
                height: '50%',
                overflow: 'hidden',
                borderRadius: '16px',
                backgroundColor: '#333', // Fallback background color
              }}
            >
              {song.image?.length > 0 ? (
                <img
                  src={song.image}
                  alt={song.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensure image covers the box without distortion
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#666', // Fallback color if no image is present
                    color: '#fff',
                  }}
                >
                  <Typography variant="body2">No Image Available</Typography>
                </Box>
              )}
            </Box>

            <CardContent sx={{ padding: '8px', flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, fontWeight: 'bold' }}
              >
                {song.title}
              </Typography>

              {/* Play Button */}
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handlePlayClick(song); // Handle play button click
                }}
                sx={{
                  backgroundColor: '#ff6f61',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#ff9966',
                  },
                  margin: '8px 0', // Add margin for spacing
                }}
              >
                <PlayArrowIcon />
              </IconButton>
            </CardContent>
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#555',
                padding: '10px',
                borderRadius: '0 0 20px 20px',
                color: '#fff',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                }}
              >
                {song.description}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BottomComponent1;
