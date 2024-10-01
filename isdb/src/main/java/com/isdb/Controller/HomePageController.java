package com.isdb.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isdb.Entity.HomePage;
import com.isdb.Entity.Song;
import com.isdb.Service.HomePageService;
import com.isdb.dto.RatingRequest;
import com.isdb.dto.RatingRequestDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/songs")
public class HomePageController {

	@Autowired
	private HomePageService service;

	@GetMapping("/songs")
	public ResponseEntity<List<HomePage>> getSongs() {
		List<HomePage> songlist = service.getSongs();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

	@GetMapping("/afterlogin")
	public ResponseEntity<List<HomePage>> getSongs2() {
		List<HomePage> songlist = service.getSongs();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

	@PutMapping("/{id}/rating")
	public ResponseEntity<HomePage> updateSongRating(@PathVariable("id") Long songId,
			@RequestBody RatingRequest ratingRequest) {
		HomePage updatedSong = service.updateSongRating(songId, ratingRequest.getRating());
		return ResponseEntity.ok(updatedSong); // Return the updated song entity
	}

	@GetMapping("/verticalsongs")
	public ResponseEntity<List<HomePage>> getSongs1() {
		List<HomePage> songlist = service.getSongs1();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

	@GetMapping("/horizontalsongs")
	public ResponseEntity<List<HomePage>> getSongs3s() {
		List<HomePage> songlist = service.getSongs2();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

	@GetMapping("/explore")
	public ResponseEntity<List<HomePage>> getSongs3() {
		List<HomePage> songlist = service.getSongs3();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

	@GetMapping("/discover")
	public ResponseEntity<List<HomePage>> getSongs4() {
		List<HomePage> songlist = service.getSongs4();
		return new ResponseEntity<List<HomePage>>(songlist, HttpStatus.OK);
	}

}
