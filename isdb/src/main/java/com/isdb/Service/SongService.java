package com.isdb.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.isdb.Entity.Song;
import com.isdb.Repository.SongRepository;

import java.util.List;
	import java.util.Optional;

	@Service
	public class SongService {

	    @Autowired
	    private SongRepository songRepository;

	    public List<Song> getAllSongs() {
	        return songRepository.findAll();
	    }

	    public Optional<Song> getSongById(Long id) {
	        return songRepository.findById(id);
	    }

	    public List<Song> searchSongsByTitle(String title) {
	        return songRepository.findByTitleContainingIgnoreCase(title);
	    }

	    public Song addSong(Song song) {
	        return songRepository.save(song);
	    }
	}

