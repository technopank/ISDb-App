package com.isdb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isdb.Entity.HomePage;
import com.isdb.Entity.Song;

@Repository
public interface HomePageRepository extends JpaRepository<HomePage, Long>{

}
