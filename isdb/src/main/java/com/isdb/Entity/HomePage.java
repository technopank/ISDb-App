package com.isdb.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "songs")
public class HomePage {

	@Override
	public String toString() {
		return "HomePage [id=" + id + ", title=" + title + ", artist=" + artist + ", description=" + description
				+ ", image=" + image + ", rating=" + rating + ", youtubeUrl=" + youtubeUrl + "]";
	}

	public HomePage() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String title;
	
	private String artist;
	
	private String description;
	
	@Column(length=500)
	private String image;
	
	private int rating;
	
	private String youtubeUrl;
	
	
	
	public HomePage(long id, String title, String artist, String description, String image, int rating,
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
	
	

	public long getId() {
		return id;
	}

	public String getYoutubeUrl() {
		return youtubeUrl;
	}

	public void setYoutubeUrl(String youtubeUrl) {
		this.youtubeUrl = youtubeUrl;
	}


	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
	
	
}
