package com.example.demo.controller;

import com.example.demo.model.Categorie;
import com.example.demo.model.Livre;
import com.example.demo.model.LivreDTO;
import com.example.demo.service.LivreService;
import com.example.demo.repository.CategorieRepository;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/livres")
@CrossOrigin(origins = "http://localhost:4200")
public class LivreController {

    private final LivreService livreService;
    private final CategorieRepository categorieRepository;

    public LivreController(LivreService livreService, CategorieRepository categorieRepository) {
        this.livreService = livreService;
        this.categorieRepository = categorieRepository;
    }

    // Récupérer tous les livres
    @GetMapping
    public List<Livre> getAll() {
        return livreService.findAll();
    }

    // Récupérer un livre par ID
    @GetMapping("/{id}")
    public Optional<Livre> get(@PathVariable Long id) {
        return livreService.findById(id);
    }

    // Créer un livre avec DTO (gestion de la catégorie unique)
    @PostMapping
    public Livre create(@RequestBody LivreDTO dto) {
      return livreService.createLivre(dto);
    }
    // Créer plusieurs livres à la fois avec DTO(nouveau) :
    @PostMapping("/bulk")
public List<Livre> createBulk(@RequestBody List<LivreDTO> dtos) {
    return livreService.createLivresBulk(dtos);
}


    // Mettre à jour un livre avec DTO
    @PutMapping("/{id}")
    public Livre update(@PathVariable Long id, @RequestBody LivreDTO dto) {
        return livreService.updateLivre(id, dto);
    }

    // Supprimer un livre
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        livreService.delete(id);
    }

    // Recherche par titre, auteur ou catégorie
    @GetMapping("/search")
    public List<Livre> search(@RequestParam String q) {
        return livreService.search(q);
    }

    @GetMapping("/categories")
    public List<Categorie> getAllCategories() {
      return categorieRepository.findAll();
    }
    @GetMapping("/paged")
public Page<Livre> getAllPaged(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "5") int size,
    @RequestParam(defaultValue = "titre") String sortBy,
    @RequestParam(defaultValue = "asc") String direction
) {
    return livreService.findAllPaged(page, size, sortBy, direction);
}

@GetMapping("/search-paged")
public Page<Livre> searchPaged(
    @RequestParam String q,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "5") int size,
    @RequestParam(defaultValue = "titre") String sortBy,
    @RequestParam(defaultValue = "asc") String direction
) {
    return livreService.searchPaged(q, page, size, sortBy, direction);
}

}
