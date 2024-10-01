package com.isdb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.isdb.Entity.Song;
import com.isdb.Service.SongService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React frontend
public class SongController {

    @Autowired
    private SongService songService;

//    @GetMapping
//    public List<Song> getAllSongs() {
//        return songService.getAllSongs();
//    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable("id") Long id) {
        Optional<Song> song = songService.getSongById(id);
        return song.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    

    @GetMapping("/afterloginsongdetails/{id}")
    public ResponseEntity<Song> getSongById1(@PathVariable("id") Long id) {
        Optional<Song> song = songService.getSongById(id);
        return song.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

//    @GetMapping("/song/search")
//    public List<Song> searchSongs(@RequestParam String title) {
//        return songService.searchSongsByTitle(title);
//    }

//    @PostMapping
//    public Song addSong(@RequestBody Song song) {
//        return songService.addSong(song);
//    }
}
