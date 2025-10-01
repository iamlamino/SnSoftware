package com.example.demo.service;

import com.example.demo.model.Categorie;
import com.example.demo.repository.CategorieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class CategorieService {

    private final CategorieRepository repo;

    public CategorieService(CategorieRepository repo) {
        this.repo = repo;
    }

    public List<Categorie> findAll() {
      return repo.findAll();
    }


    public Optional<Categorie> findById(Long id) { return repo.findById(id); }

    public Categorie create(Categorie c) { return repo.save(c); }

    public Categorie update(Long id, Categorie updated) {
        return repo.findById(id).map(c -> {
            c.setNom(updated.getNom());
            return repo.save(c);
        }).orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
    }

    public void delete(Long id) {
      if (!repo.existsById(id))
        throw new RuntimeException("Catégorie non trouvée");
      repo.deleteById(id);
    }
    @Autowired
    private CategorieRepository categorieRepository;

    public List<Categorie> createCategories(List<Categorie> categories) {
      return categorieRepository.saveAll(categories);
    }


public List<Categorie> search(String query) {
    if (query == null || query.isEmpty()) {
        return categorieRepository.findAll();
    }
    return categorieRepository.findByNomContainingIgnoreCase(query);
}
}
