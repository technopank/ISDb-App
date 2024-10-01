package com.isdb.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "songdetails")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    private String artist;
    
    private String description;
    
	@Column(length=500)
    private String image;
	
    private double rating;
    
    private String youtubeUrl;

    // Constructors
    public Song() {}


	public String getYoutubeUrl() {
		return youtubeUrl;
	}

	public void setYoutubeUrl(String youtubeUrl) {
		this.youtubeUrl = youtubeUrl;
	}

	@Override
	public String toString() {
		return "Song [id=" + id + ", title=" + title + ", artist=" + artist + ", description=" + description
				+ ", image=" + image + ", rating=" + rating + ", youtubeUrl=" + youtubeUrl + "]";
	}



	public Song(Long id, String title, String artist, String description, String image, double rating,
			String youtubeUrl) {
		super();
		this.id = id;
		this.title = title;
		this.artist = artist;
		this.description = description;
		this.image = image;
		this.rating = rating;
		this.youtubeUrl = youtubeUrl;
	}



	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getimage() { return image; }
    public void setimage(String image) { this.image = image; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
}
