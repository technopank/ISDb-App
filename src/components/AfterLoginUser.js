import React, { useState, useEffect } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CarouselComponent from './CarouselComponent';
import VerticalListComponent from './VerticalListComponent';
import BottomComponent from './BottomComponent';
import BottomComponent1 from './BottomComponent1';
import HorizontalListComponent from './HorizontalListComponent';
import Footer from './Footer';
import axios from 'axios';
import API from '../Api';
import '../App.css';

function AfterLoginUser() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);

  useEffect(() => {
    axios.get(`${API}/afterlogin`)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    const hasSeenCongrats = localStorage.getItem('hasSeenCongrats');
    if (!hasSeenCongrats) {
      setShowCongratsPopup(true);
      localStorage.setItem('hasSeenCongrats', 'true');
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowHistory(true);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '' && !searchHistory.includes(searchTerm)) {
      const updatedHistory = [searchTerm, ...searchHistory.slice(0, 2)];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
    setShowHistory(false);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    setShowHistory(false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCardClick = (song) => {
    navigate(`/afterloginsongdetails/${song.id}`);
  };

  const handleRateClick = (song) => {
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

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="app-container">
      <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}
            onClick={() => navigate('/afterlogin')}
          >
            <span className="logo">ISDb</span>
          </Typography>

          <Box sx={{ position: 'relative', width: isMobile ? '60%' : 300, marginRight: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Songs..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 100)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearchSubmit}>
                    <SearchIcon sx={{ color: '#fff' }} />
                  </IconButton>
                ),
                sx: { backgroundColor: '#333', color: '#fff', borderRadius: 1 },
              }}
              fullWidth
            />
            {showHistory && searchHistory.length > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  backgroundColor: '#333',
                  color: '#fff',
                  maxHeight: 150,
                  overflowY: 'auto',
                }}
              >
                <List dense>
                  {searchHistory.map((term, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleHistoryClick(term)}
                      sx={{ '&:hover': { backgroundColor: '#444' } }}
                    >
                      <ListItemText primary={term} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="outlined"
            size="small"
            sx={{
              marginLeft: 2,
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: 1,
              height: 35,
              '& .MuiSelect-select': {
                padding: '0 8px',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#333',
                  color: '#fff',
                },
              },
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="fr">FR</MenuItem>
            <MenuItem value="de">DE</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2, backgroundColor: '#f5c518', color: '#000' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={showCongratsPopup} onClose={() => setShowCongratsPopup(false)} maxWidth="md" fullWidth>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography variant="h6" color="textPrimary">
            Congrats! You have got freemium access to millions of songs. Enjoy!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCongratsPopup(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRatingDialog}
        onClose={() => setOpenRatingDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Rate {selectedSong?.title}</DialogTitle>
        <DialogContent>
          <Rating
            value={newRating}
            onChange={(event, newValue) => setNewRating(newValue)}
            precision={0.5}
            size="large"
          />
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

      <Grid container spacing={3} sx={{ marginTop: 2, padding: isMobile ? '16px' : '24px' }}>
        <Grid item xs={12} sm={8}>
          <CarouselComponent
            songs={paginatedSongs}
            onRateClick={handleRateClick}
            onCardClick={handleCardClick}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <VerticalListComponent
            songs={paginatedSongs.slice(1)}
            onRateClick={handleRateClick}
            onCardClick={handleCardClick}
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 2 }}>
        <HorizontalListComponent
          songs={paginatedSongs}
          onRateClick={handleRateClick}
          onCardClick={handleCardClick}
        />
      </Box>

      <BottomComponent items={paginatedSongs.slice(3)} onCardClick={handleCardClick} />
      <BottomComponent1 items={paginatedSongs.slice(3)} onCardClick={handleCardClick} />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={paginatedSongs.length < itemsPerPage}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>

      <Footer />
    </div>
  );
}

export default AfterLoginUser;
