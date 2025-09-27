package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "livres")
public class Livre {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Le titre est obligatoire")
  private String titre;

  @NotBlank(message = "L'auteur est obligatoire")
  private String auteur;

  @PastOrPresent(message = "La date de publication ne peut pas être dans le futur")
  private LocalDate datePublication;

  @NotBlank(message = "L'ISBN est obligatoire")
  @Column(unique = true)
  private String isbn;

  @Size(max = 1000, message = "La description ne doit pas dépasser 1000 caractères")
  private String description;

  public Livre() {
  }

  public Livre(Long id, String titre, String auteur, LocalDate datePublication, String isbn, String description) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.datePublication = datePublication;
    this.isbn = isbn;
    this.description = description;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitre() {
    return titre;
  }

  public void setTitre(String titre) {
    this.titre = titre;
  }

  public String getAuteur() {
    return auteur;
  }

  public void setAuteur(String auteur) {
    this.auteur = auteur;
  }

  public LocalDate getDatePublication() {
    return datePublication;
  }

  public void setDatePublication(LocalDate datePublication) {
    this.datePublication = datePublication;
  }
   public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
