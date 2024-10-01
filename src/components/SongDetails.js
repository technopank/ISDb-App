import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HorizontalListComponent from './HorizontalListComponent';
import Footer from './Footer';
import API from '../Api';

function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [songListError, setSongListError] = useState(false);
  const [playingUrl, setPlayingUrl] = useState(null);


  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios.get(`${API}/songs/${id}`)
      .then(response => {
        setSong(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });

    axios.get(`${API}/songs`)
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('Error fetching all songs:', error);
        setSongListError(true);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: 'black' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: 'black' }}>
        <Typography variant="h6" color="error">
          Error fetching song details.
        </Typography>
      </Box>
    );
  }

  if (songListError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: 'black' }}>
        <Typography variant="h6" color="error">
          Error fetching songs list.
        </Typography>
      </Box>
    );
  }
  const handlePlayClick = (event, songUrl) => {
    event.stopPropagation();

    if (playingUrl === songUrl) {
      setPlayingUrl(null); // Stop playing
    } else {
      setPlayingUrl(songUrl); // Play new song
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      {/* Header with Home Button and Signup/Login Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}
          onClick={() => navigate('/')}
        >
          <span className="logo">ISDb</span>
        </Typography>

        {/* Signup and Login Buttons */}
        <Box>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: '#f5c518',
              color: '#000',
              marginRight: '10px',
              '&:hover': {
                backgroundColor: '#e4b800',
              },
            }}
          >
            Signup
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: '#f5c518',
              color: '#000',
              '&:hover': {
                backgroundColor: '#e4b800',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ marginBottom: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Songs"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '40%',
            backgroundColor: 'white',
            borderRadius: '50px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
            marginTop: '-20px',
          }}
        />
      </Box>

      {/* Song Details Card */}
      {song && (
        <Card sx={{ marginBottom: '20px', boxShadow: 4, backgroundColor: '#333', color: 'white', width: '90%', maxWidth: '400px', margin: '0 auto', borderRadius: '8px' }}>
          <CardMedia
            component="img"
            height="70%"
            image={song.image && song.image.length > 0 ? song.image : 'fallback_image_url'}
            alt={song.title}
            sx={{
              borderRadius: '8px',
              marginBottom: '10px',
              objectFit: 'cover',
              width: '100%',
              height: 'auto',
            }}
          />
          <CardContent sx={{ padding: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
              {song.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ textAlign: 'center', mb: 1 }}>
              Artist: {song.artist}
            </Typography>
            {song.album && (
              <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'center', mb: 1 }}>
                Album: {song.album}
              </Typography>
            )}
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'center', mb: 1 }}>
              Rating: {song.rating} / 5
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center', maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {song.description}
            </Typography>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
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
          </CardContent>
        </Card>
      )}

      {/* Horizontal List of Songs */}
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Related Songs
        </Typography>
        {filteredSongs.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No songs found for "{searchTerm}"
          </Typography>
        ) : (
          <HorizontalListComponent
            songs={filteredSongs}
            onCardClick={(selectedSong) => navigate(`/songs/${selectedSong.id}`)}
          />
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default SongDetails;
