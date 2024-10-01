package com.isdb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isdb.Entity.Song;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    // Add custom query to filter songs by title
    List<Song> findByTitleContainingIgnoreCase(String title);
}
