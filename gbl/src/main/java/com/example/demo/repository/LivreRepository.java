package com.example.demo.repository;

import com.example.demo.model.Livre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
  List<Livre> findByTitreContainingIgnoreCaseOrAuteurContainingIgnoreCase(String titre, String auteur);
}

