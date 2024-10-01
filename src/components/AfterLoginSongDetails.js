import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Rating,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HorizontalListComponent from './HorizontalListComponent';
import BottomComponent from './BottomComponent';
import BottomComponent1 from './BottomComponent1';
import Footer from './Footer';
import API from '../Api';

function AfterLoginSongDetails() {
  const { id } = useParams();
  const [selectedSong, setSelectedSong] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [songListError, setSongListError] = useState(false);

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

    axios.get(`${API}/afterlogin`)
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('Error fetching all songs:', error);
        setSongListError(true);
      });
  }, [id]);

  const HandleRateClick = (song) => {
    setSelectedSong(song);
    setNewRating(song.rating || 0);
    setOpenRatingDialog(true);
  };

  const saveRating = () => {
    if (selectedSong) {
      const updatedSongs = songs.map((s) =>
        s.id === selectedSong.id ? { ...s, rating: newRating } : s
      );
      setSongs(updatedSongs);

      axios.put(`${API}/${selectedSong.id}/rating`, { rating: newRating })
        .then(() => {
          console.log('Rating saved successfully');
          setOpenRatingDialog(false);
          setSelectedSong(null);
          setNewRating(0);
        })
        .catch((error) => {
          console.error('Error saving rating:', error);
        });
    }
  };

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

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      {/* Header with Home Button and Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}
          onClick={() => navigate('/afterlogin')}
        >
          <span className="logo">ISDb</span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#f5c518', color: '#000' }}
          onClick={() => {
            navigate('/');
          }}
        >
          Log out
        </Button>
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
                onClick={() => window.open(song.youtubeUrl, '_blank')}
                sx={{
                  backgroundColor: '#ff4081',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '10px',
                  '&:hover': {
                    backgroundColor: '#e91e63',
                  },
                }}
              >
                <PlayArrowIcon fontSize="large" />
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
            onRateClick={HandleRateClick}
            songs={filteredSongs}
            onCardClick={(selectedSong) => navigate(`/afterloginsongdetails/${selectedSong.id}`)}
          />
        )}
      </Box>

      {/* Bottom Components (Scrollable) */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <BottomComponent songs={filteredSongs} onCardClick={(selectedSong) => navigate(`/afterloginsongdetails/${selectedSong.id}`)} />
        </Grid>
        <Grid item xs={12}>
          <BottomComponent1 songs={filteredSongs} onCardClick={(selectedSong) => navigate(`/afterloginsongdetails/${selectedSong.id}`)} />
        </Grid>
      </Grid>

      <Dialog
        open={openRatingDialog}
        onClose={() => setOpenRatingDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Rate {selectedSong?.title}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h6">Current Rating: {selectedSong?.rating || 0} / 5</Typography>
            <Rating
              name="rating"
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue)}
              size="large"
              sx={{ marginTop: '20px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRatingDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={saveRating} color="primary">
            Save Rating
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default AfterLoginSongDetails;
