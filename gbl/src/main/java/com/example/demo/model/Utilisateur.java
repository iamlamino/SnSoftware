package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StatutUtilisateur statut;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Column(nullable = false)
    private String prenom;

    @NotBlank(message = "Email obligatoire")
    @Email(message = "Format d'email invalide")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Mot de passe obligatoire")
    @Size(min = 4, message = "Le mot de passe doit contenir au moins 4 caractères")
    @Pattern(
    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
    message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial")
    @Column(nullable = false)
    private String motDePasse;

    // Constructeurs
    public Utilisateur() {}

    public Utilisateur(String nom, String prenom, String email, String motDePasse, StatutUtilisateur statut) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.statut = statut;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
      this.motDePasse = motDePasse;
    }

    public StatutUtilisateur getStatut() {
      return statut;
    }
    public void setStatut(StatutUtilisateur statut) {
      this.statut = statut;
    }
}
