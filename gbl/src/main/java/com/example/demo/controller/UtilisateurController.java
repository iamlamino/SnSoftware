package com.example.demo.controller;

import com.example.demo.model.Utilisateur;
import com.example.demo.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

  private final UtilisateurService service;

  public UtilisateurController(UtilisateurService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Utilisateur>> getAll() {
    return ResponseEntity.ok(service.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Utilisateur> getById(@PathVariable Long id) {
    return service.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<?> create(@Valid @RequestBody Utilisateur utilisateur) {
    try {
      Utilisateur saved = service.create(utilisateur);
      return ResponseEntity.status(201).body(saved);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Utilisateur utilisateur) {
    try {
      Utilisateur updated = service.update(id, utilisateur);
      return ResponseEntity.ok(updated);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    try {
      service.delete(id);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }

  }

  // Recherche par nom, prénom ou email
  @GetMapping("/search")
  public List<Utilisateur> search(@RequestParam String q) {
    return service.search(q);
  }
}
