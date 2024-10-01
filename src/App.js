import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
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
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CarouselComponent from './components/CarouselComponent';
import VerticalListComponent from './components/VerticalListComponent';
import SongDetails from './components/SongDetails';
import AfterLoginUser from './components/AfterLoginUser';
import AfterLoginSongDetails from './components/AfterLoginSongDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import axios from 'axios';
import API from './Api';
import './App.css';
import BottomComponentCopy from './components/BottomComponentCopy';

function App() {
  const [songs, setSongs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add logged-in state
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  // Freemium access popup
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  useEffect(() => {
    axios.get(`${API}/songs`)
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');
  }, []);


  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
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

  // Show signup prompt when a card, rate, or play button is clicked
  const handleShowSignupPrompt = () => {
    setShowSignupPrompt(true);
  };

  const handleCardClick = (song) => {
    if (!isLoggedIn) {
      handleShowSignupPrompt();
        } else {
      // Handle card click action for logged-in users
      navigate(`/songs/${song.id}`);
    }
  };


  const handleRateClick = (song) => {
      setShowSignupPrompt(true); // Show freemium prompt if not logged in
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSongs = filteredSongs.slice(
  );

  return (
    <div className="app-container">
      <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}
            onClick={() => navigate('/')}
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
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2, backgroundColor: '#f5c518', color: '#000' }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 1, backgroundColor: '#f5c518', color: '#000' }}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>

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
        <Grid item xs={12}>
          <BottomComponentCopy             
          songs={paginatedSongs.slice(2)}
          onCardClick={handleCardClick} />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>

      {/* Freemium Access Popup */}
      <Dialog open={showSignupPrompt} onClose={() => setShowSignupPrompt(false)}>
        <DialogTitle>Freemium Access</DialogTitle>
        <DialogContent>
          <Typography>Sign up for freemium access to millions of songs.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowSignupPrompt(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/songs/:id" element={<SongDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/afterlogin" element={<AfterLoginUser />} />
        <Route path="/afterloginsongdetails/:id" element={<AfterLoginSongDetails />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouter;
