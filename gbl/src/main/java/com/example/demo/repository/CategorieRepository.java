package com.example.demo.repository;

import com.example.demo.model.Categorie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {

        List<Categorie> findByNomContainingIgnoreCase(String nom);


}
