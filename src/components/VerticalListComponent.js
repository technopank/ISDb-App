import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, Rating, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';
import API from '../Api';

const VerticalListComponent = ({ onRateClick, onCardClick }) => {
  const [songs, setSongs] = useState([]); // State to store songs fetched from the database
  const [loading, setLoading] = useState(false); // Add loading state to handle API call
  const navigate = useNavigate(); // Initialize useNavigate
  const [playingUrl, setPlayingUrl] = useState(null);


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${API}/verticalsongs`);
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);


  const handlePlayClick = (event, songUrl) => {
    event.stopPropagation();

    if (playingUrl === songUrl) {
      setPlayingUrl(null); // Stop playing
    } else {
      setPlayingUrl(songUrl); // Play new song
    }
  };

  // Handle rating change and update the backend
  const handleRatingChange = async (event, newValue, song) => {
    event.stopPropagation(); // Prevent card click event from triggering

    if (newValue !== song.rating) {
      setLoading(true); // Set loading to true before making the API call

      try {
        // Send PUT request to update the rating
        const response = await axios.put(`${API}/songs/${song.id}/rating`, {
          rating: newValue,
        });

        if (response.status === 200) {
          // Update the song's rating locally in the state
          setSongs((prevSongs) =>
            prevSongs.map((s) =>
              s.id === song.id ? { ...s, rating: newValue } : s
            )
          );
        } else {
          console.error('Failed to update rating:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating rating:', error);
      } finally {
        setLoading(false); // Set loading back to false after the API call
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#fff' }}>
        Most Popular
      </Typography>
      <Box
        sx={{
          maxHeight: '45vh',
          overflowY: 'auto',
          paddingRight: '8px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(45deg, #ff6f61, #ff9966)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2c2c2c',
            borderRadius: '10px',
          },
          scrollBehavior: 'smooth',
        }}
      >
        {songs.map((song) => (
          <Card
            key={song.id}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#2c2c2c',
              color: '#fff',
              borderRadius: '16px',
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              cursor: 'pointer',
              width: '500px',
            }}
            onClick={() => onCardClick(song)}
          >
            <Box
              sx={{
                width: '40%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#333',
                position: 'relative',
              }}
            >
              {song.image && song.image.length > 0 ? (
                <img
                  src={song.image}
                  alt={song.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#666',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6">No Image Available</Typography>
                </Box>
              )}
  <IconButton
                  onClick={(event) => handlePlayClick(event, song.youtubeURL)}
                  aria-label={`Play ${song.title}`}
                  sx={{
                    backgroundColor: '#ff6f61',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '12px',
                    fontSize: '2rem',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#ff9966',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {playingUrl === song.youtubeURL ? (
                    <PauseIcon sx={{ fontSize: '2.5rem' }} />
                  ) : (
                    <PlayArrowIcon sx={{ fontSize: '2.5rem' }} />
                  )}
                </IconButton>
            </Box>

            <CardContent
              sx={{
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px 12px',
              }}
            >
              <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem', lineHeight: '1.2' }}>
                {song.title} - {song.artist}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ marginTop: 0.5 }}>
                <Rating
                  value={song.rating}
                  precision={0.5}
                  onChange={(event, newValue) => handleRatingChange(event, newValue, song)}
                  size="small"
                  icon={<StarIcon fontSize="inherit" style={{ color: '#FFD700' }} />}
                  disabled={loading} // Disable rating interaction while API call is in progress
                />
                <Typography variant="body2" sx={{ marginLeft: 0.5, color: '#FFD700' }}>
                  {song.rating} / 5
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  marginTop: 0.5,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {song.description}
              </Typography>

              <Button
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  onRateClick(song); // Handle rate click
                }}
                sx={{
                  marginTop: 1,
                  alignSelf: 'flex-start',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '20px',
                  background: 'linear-gradient(45deg, #ff6f61, #ff9966)',
                  color: '#fff',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5c5c, #ff7f50)',
                  },
                }}
              >
                Rate
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(VerticalListComponent);
