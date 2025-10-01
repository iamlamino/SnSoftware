package com.example.demo.service;

import com.example.demo.model.Categorie;
import com.example.demo.model.Livre;
import com.example.demo.model.LivreDTO;
import com.example.demo.repository.CategorieRepository;
import com.example.demo.repository.LivreRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LivreService {

    private final LivreRepository livreRepository;
    private final CategorieRepository categorieRepository;


    public LivreService(LivreRepository livreRepository, CategorieRepository categorieRepository) {
        this.livreRepository = livreRepository;
        this.categorieRepository = categorieRepository;
    }

    // Récupérer tous les livres
    public List<Livre> findAll() {
        return livreRepository.findAll();
    }

    // Récupérer un livre par ID
    public Optional<Livre> findById(Long id) {
        return livreRepository.findById(id);
    }

    // Supprimer un livre
    public void delete(Long id) {
        if (!livreRepository.existsById(id)) {
            throw new RuntimeException("Livre non trouvé");
        }
        livreRepository.deleteById(id);
    }

    // Recherche par titre, auteur, ou catégorie
    public List<Livre> search(String query) {
        return livreRepository.search(query);
    }



    // Créer un livre avec DTO (une seule catégorie)
    public Livre createLivre(LivreDTO dto) {
        Livre livre = new Livre();
        livre.setTitre(dto.getTitre());
        livre.setAuteur(dto.getAuteur());
        livre.setDatePublication(dto.getDatePublication());
        livre.setIsbn(dto.getIsbn());
        livre.setDescription(dto.getDescription());

        if (dto.getCategorieId() != null) {
            Categorie categorie = categorieRepository.findById(dto.getCategorieId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
            livre.setCategorie(categorie);
        }

        return livreRepository.save(livre);
    }

    // Mettre à jour un livre avec DTO
    public Livre updateLivre(Long id, LivreDTO dto) {
    Livre existing = livreRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

    existing.setTitre(dto.getTitre());
    existing.setAuteur(dto.getAuteur());
    existing.setDatePublication(dto.getDatePublication());
    existing.setIsbn(dto.getIsbn());
    existing.setDescription(dto.getDescription());

    if (dto.getCategorieId() != null) {
        Categorie categorie = categorieRepository.findById(dto.getCategorieId())
            .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
        existing.setCategorie(categorie);
    } else {
        existing.setCategorie(null);
    }

    return livreRepository.save(existing); // 👉 fait un UPDATE propre
}


    //J'ai ajouté cett méthode pour entrer un set de livre sur postman, et enrichir plus facilement la bdd(comme dans catégorie) :
    public List<Livre> createLivresBulk(List<LivreDTO> dtos) {
      List<Livre> livres = new ArrayList<>();

      for (LivreDTO dto : dtos) {
        Livre livre = new Livre();
        livre.setTitre(dto.getTitre());
        livre.setAuteur(dto.getAuteur());
        livre.setDatePublication(dto.getDatePublication());
        livre.setIsbn(dto.getIsbn());
        livre.setDescription(dto.getDescription());

        if (dto.getCategorieId() != null) {
          Categorie categorie = categorieRepository.findById(dto.getCategorieId())
              .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
          livre.setCategorie(categorie);
        }

        livres.add(livre);
      }

      return livreRepository.saveAll(livres);
    }
public Page<Livre> findAllPaged(int page, int size, String sortBy, String direction) {
    Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, size, sort);
    return livreRepository.findAll(pageable);
}

public Page<Livre> searchPaged(String query, int page, int size, String sortBy, String direction) {
    Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, size, sort);
    return livreRepository.search(query, pageable);
}

}
