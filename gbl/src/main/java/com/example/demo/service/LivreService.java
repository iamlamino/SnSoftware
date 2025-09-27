package com.example.demo.service;

import com.example.demo.model.Livre;
import com.example.demo.repository.LivreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivreService {

    private final LivreRepository repo;

    public LivreService(LivreRepository repo) {
        this.repo = repo;
    }

    public List<Livre> findAll() {
        return repo.findAll();
    }

    public Optional<Livre> findById(Long id) {
        return repo.findById(id);
    }

    public Livre create(Livre livre) {
        return repo.save(livre);
    }

    public Livre update(Long id, Livre updated) {
        return repo.findById(id).map(l -> {
            l.setTitre(updated.getTitre());
            l.setAuteur(updated.getAuteur());
            l.setDatePublication(updated.getDatePublication());
            l.setIsbn(updated.getIsbn());
            l.setDescription(updated.getDescription());
            return repo.save(l);
        }).orElseThrow(() -> new RuntimeException("Livre non trouvé"));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Livre non trouvé");
        }
        repo.deleteById(id);
    }

public List<Livre> search(String query) {
  return repo.findByTitreContainingIgnoreCaseOrAuteurContainingIgnoreCase(query, query);
}
}
