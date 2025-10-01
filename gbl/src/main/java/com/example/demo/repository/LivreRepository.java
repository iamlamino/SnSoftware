package com.example.demo.repository;

import com.example.demo.model.Livre;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
  @Query("SELECT DISTINCT l FROM Livre l " +
       "LEFT JOIN l.categorie c " +
       "WHERE LOWER(l.titre) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(l.auteur) LIKE LOWER(CONCAT('%', :query, '%')) " +
       "OR LOWER(c.nom) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Livre> search(@Param("query") String query);

 @Query("SELECT DISTINCT l FROM Livre l " +
           "LEFT JOIN l.categorie c " +
           "WHERE LOWER(l.titre) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(l.auteur) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.nom) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Livre> search(@Param("query") String query, Pageable pageable);


}

