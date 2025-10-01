package com.example.demo.controller;

import com.example.demo.model.Categorie;
import com.example.demo.service.CategorieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/categories")
public class CategorieController {

    private final CategorieService service;

    public CategorieController(CategorieService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categorie> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Categorie get(@PathVariable Long id) {
        return service.findById(id).orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
    }

    @PostMapping
    public Categorie create(@RequestBody Categorie c) {
      return service.create(c);
    }
   @Autowired
    private CategorieService categorieService;

    @PostMapping("/bulk")//Pour créer plusieurs catégories à la fois quand je vais injecter sur postman
    public List<Categorie> createCategories(@RequestBody List<Categorie> categories) {
        return categorieService.createCategories(categories);
    }

    @PutMapping("/{id}")
    public Categorie update(@PathVariable Long id, @RequestBody Categorie c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
      service.delete(id);
    }

    @GetMapping("/search")
public List<Categorie> searchCategories(@RequestParam("q") String query) {
    return categorieService.search(query);
}

}
