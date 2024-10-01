import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Rating, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import API from '../Api';

const HorizontalListComponent = ({ onRateClick, onCardClick }) => {
  const [songs, setSongs] = useState([]);
  const [localRatings, setLocalRatings] = useState({});

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${API}/horizontalsongs`);
        setSongs(response.data);
        // Initialize local ratings from fetched songs
        const initialRatings = response.data.reduce((acc, song) => {
          acc[song.id] = song.rating; // Store initial ratings
          return acc;
        }, {});
        setLocalRatings(initialRatings);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handlePlayClick = (event, youtubeUrl) => {
    event.stopPropagation();
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    } else {
      alert('No YouTube URL available for this song');
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', marginBottom: '1.5rem' }}>
        Top Most Listened
      </Typography>
      <Box
        sx={{
          marginBottom: '3rem',
          overflowX: 'auto',
          display: 'flex',
          gap: 3,
          padding: 2,
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {songs.map((song) => (
          <Box
            key={song.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333',
                color: '#fff',
                textAlign: 'center',
                position: 'relative',
                boxShadow: 'none',
                flexShrink: 0,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
                cursor: 'pointer',
              }}
              onClick={() => onCardClick(song)}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflow: 'hidden',
                  zIndex: 0,
                }}
              >
                {song.image ? (
                  <img
                    src={song.image || 'fallback-image-url.jpg'}
                    alt={song.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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
              </Box>
              <IconButton
                onClick={(event) => handlePlayClick(event, song.youtubeUrl)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#ff6f61',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '6px',
                  fontSize: '1.5rem',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: '#ff9966',
                  },
                }}
              >
                <PlayArrowIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  textAlign: 'center',
                  background: 'rgba(0, 0, 0, 0.6)',
                  width: '100%',
                  padding: '4px 0',
                  zIndex: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  {song.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  {song.artist}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: 1 }}>
                  <Rating
                    value={localRatings[song.id] || song.rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setLocalRatings((prev) => ({ ...prev, [song.id]: newValue }));
                    }}
                    size="small"
                    icon={<StarIcon fontSize="inherit" style={{ color: '#FFD700' }} />}
                  />
                  <Typography variant="caption" sx={{ marginLeft: 0.5 }}>
                    {localRatings[song.id] || song.rating} / 5
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Box sx={{ marginTop: '1rem' }}>
              <button
                onClick={() => onRateClick(song)}
                style={{
                  border: 'none',
                  background: 'linear-gradient(45deg, #ff6f61, #ff9966)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ff5c5c, #ff7f50)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ff6f61, #ff9966)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Rate
              </button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(HorizontalListComponent);
