import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import the play icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import API from '../Api';

const BottomComponent = () => {
  const [items, setItems] = useState([]); // State to store items fetched from the database
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Function to fetch items from the 'explore' table
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/explore`); // Make GET request to the backend
        setItems(response.data); // Update items state with the fetched data
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems(); // Fetch items when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleCardClick = (songId) => {
    navigate(`/afterloginsongdetails/${songId}`); // Navigate to SongDetails page with the song ID
  };

  const handlePlayClick = (song) => {
    if (song.youtubeUrl) {
      window.open(song.youtubeUrl, '_blank'); // Open the YouTube link in a new tab
    } else {
      alert('No YouTube URL available for this item');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem', color: '#fff' }}>
        Explore
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // Enable horizontal scrolling
          gap: 3, // Increase gap between cards
          padding: 2,
          justifyContent: 'center', // Center cards horizontally
          whiteSpace: 'nowrap', // Prevent cards from wrapping to the next line
          marginBottom: '3rem', // Ensure enough space below the cards
          '&::-webkit-scrollbar': {
            display: 'none' // Hide scrollbar for a cleaner look
          }
        }}
      >
        {items.map((song) => (
          <Card
            key={song.id}
            onClick={() => handleCardClick(song.id)} // Navigate to details page on card click
            sx={{
              width: 200, // Increased width
              height: 350, // Increased height
              borderRadius: '15px', // Rounded corners
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between', // Push description to the bottom
              alignItems: 'center',
              backgroundColor: '#333',
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow for depth
              padding: '16px', // Padding around the card content
              flexShrink: 0, // Prevent cards from shrinking
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
              cursor: 'pointer', // Indicate that the card is clickable
              '&:hover': {
                transform: 'scale(1.05)', // Slightly enlarge card on hover
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', // Enhanced shadow on hover
              }
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                width: '100%',
                height: '60%', // Adjust height as needed
                overflow: 'hidden',
                borderRadius: '15px',
                backgroundColor: '#444', // Fallback background color in case no image is available
                position: 'relative',
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

            <CardContent sx={{ padding: '0 !important', flexGrow: 1 }}>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
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
                }}
              >
                <PlayArrowIcon />
              </IconButton>

            </CardContent>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: '#444',
                width: '100%',
                padding: '8px 0',
                borderRadius: '0 0 15px 15px', // Rounded corners for the bottom
                fontSize: '0.875rem', // Slightly smaller font size
              }}
            >
              {song.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BottomComponent;
