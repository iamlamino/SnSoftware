package com.example.demo.controller;

import com.example.demo.model.Livre;
import com.example.demo.service.LivreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livres")
@CrossOrigin(origins = "http://localhost:4200")
public class LivreController {

    private final LivreService service;

    public LivreController(LivreService service) {
        this.service = service;
    }

    // GET tous les livres
    @GetMapping
    public List<Livre> getAll() {
        return service.findAll();
    }

    // GET par ID
    @GetMapping("/{id}")
    public ResponseEntity<Livre> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (ajout d’un livre) → utile pour BookForm
    @PostMapping
    public Livre create(@RequestBody Livre livre) {
        return service.create(livre);
    }

    // PUT (mise à jour)
    @PutMapping("/{id}")
    public ResponseEntity<Livre> update(@PathVariable Long id, @RequestBody Livre livre) {
        try {
            return ResponseEntity.ok(service.update(id, livre));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Recherche par titre ou auteur
@GetMapping("/livres/search")
public List<Livre> search(@RequestParam String q) {
    return service.search(q);
}

}
