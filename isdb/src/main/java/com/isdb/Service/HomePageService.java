package com.isdb.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isdb.Entity.HomePage;
import com.isdb.Entity.Song;
import com.isdb.Repository.HomePageRepository;

@Service
public class HomePageService {
	
	@Autowired
	private HomePageRepository repo;
	
	
	public List<HomePage>getSongs(){
		return repo.findAll();
	}


	public List<HomePage> getSongs1() {
		return repo.findAll();
	}


	public List<HomePage> getSongs2() {
		return repo.findAll();
	}


	public List<HomePage> getSongs4() {
		return repo.findAll();
	}


	public List<HomePage> getSongs3() {
		return repo.findAll();
	}
	
	   public HomePage updateSongRating(Long songId, int newRating) {
	        Optional<HomePage> optionalSong = repo.findById(songId);
	        if (optionalSong.isPresent()) {
	            HomePage song = optionalSong.get();
	            song.setRating(newRating);  // Update the rating
	            return repo.save(song); // Save the updated song
	        } else {
	            throw new RuntimeException("Song with id " + songId + " not found");
	        }
	    }

}
