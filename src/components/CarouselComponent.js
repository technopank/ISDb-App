import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
  CircularProgress,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Carousel from 'react-material-ui-carousel';

const CarouselComponent = ({ songs, onRateClick, loading, onCardClick }) => {
  const [playingUrl, setPlayingUrl] = useState(null);

  const handlePlayClick = (event, songUrl) => {
    event.stopPropagation();

    if (playingUrl === songUrl) {
      setPlayingUrl(null); // Stop playing
    } else {
      setPlayingUrl(songUrl); // Play new song
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, marginTop: '5%' }}>
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#fff' }}>
        Latest Releases
      </Typography>
      <Carousel indicators={false} navButtonsAlwaysVisible={true}>
        {songs.map((song) => (
          <Card
            key={song.id}
            onClick={() => onCardClick(song)}
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                transform: 'scale(1.02)',
                transition: 'transform 0.2s',
              },
            }}
          >
            <Box
              sx={{
                height: '250px',
                width: '150px',
                overflow: 'hidden',
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#666',
              }}
            >
              {song.image ? (
                <img
                  src={song.image}
                  alt={song.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  No Image Available
                </Typography>
              )}
            </Box>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                padding: '1rem',
                flex: 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h5" sx={{ color: '#fff', flexGrow: 1 }}>
                  {song.title} - {song.artist}
                </Typography>
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
              {playingUrl === song.youtubeURL && (
                <audio controls autoPlay style={{ width: '100%', marginTop: '10px' }}>
                  <source src={song.youtubeURL} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                <Rating
                  value={song.rating}
                  precision={0.5}
                  readOnly
                  size="large"
                  icon={<StarIcon fontSize="inherit" sx={{ color: '#FFD700' }} />}
                />
                <Typography variant="body2" sx={{ marginLeft: 1, color: '#FFD700' }}>
                  {song.rating} / 5
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  marginTop: 2,
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                {song.description}
              </Typography>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  onRateClick(song);
                }}
                sx={{
                  marginTop: 2,
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '20px',
                  background: 'linear-gradient(45deg, #ff6f61, #ff9966)',
                  color: '#fff',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5c5c, #ff7f50)',
                  },
                  alignSelf: 'flex-end',
                }}
              >
                Rate this Song
              </Button>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default React.memo(CarouselComponent);
