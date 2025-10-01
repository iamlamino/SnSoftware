package com.example.demo.service;

import com.example.demo.model.Utilisateur;
import com.example.demo.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository repo;

    public UtilisateurService(UtilisateurRepository repo) {
        this.repo = repo;
    }

    public List<Utilisateur> findAll() {
        return repo.findAll();
    }

    public Optional<Utilisateur> findById(Long id) {
        return repo.findById(id);
    }

    public Utilisateur create(Utilisateur u) {
        if (repo.existsByEmail(u.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }
        return repo.save(u);
    }

    public Utilisateur update(Long id, Utilisateur updated) {
        return repo.findById(id).map(u -> {
            u.setNom(updated.getNom());
            u.setPrenom(updated.getPrenom());
            u.setEmail(updated.getEmail());
            u.setMotDePasse(updated.getMotDePasse());
            return repo.save(u);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public void delete(Long id) {
      if (!repo.existsById(id)) {
        throw new RuntimeException("Utilisateur non trouvé");
      }
      repo.deleteById(id);
    }
    public List<Utilisateur> search(String query) {
  return repo.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query, query);
}
}
