package com.example.demo.model;

public class LivreDTO {

    private String titre;
    private String auteur;
    private String datePublication;
    private String isbn;
    private String description;
    private Long categorieId;

    // Getters et Setters
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }

    public String getDatePublication() { return datePublication; }
    public void setDatePublication(String datePublication) { this.datePublication = datePublication; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCategorieId() { return categorieId; }
    public void setCategorieId(Long categorieId) { this.categorieId = categorieId; }
}
