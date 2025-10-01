import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieType } from './categorie';

// Interface pour représenter un livre complet
export interface LivreType {
  id?: number;
  titre: string;
  auteur: string;
  datePublication?: string;
  isbn?: string;
  description?: string;
  categorie?: CategorieType; // une seule catégorie maintenant
}

// DTO pour créer ou mettre à jour un livre
export interface LivreDTO {
  titre: string;
  auteur: string;
  datePublication?: string;
  isbn?: string;
  description?: string;
  categorieId: number; // un seul id
}

@Injectable({ providedIn: 'root' })
export class Livre {
  private baseUrl = 'http://localhost:8080/api/livres';

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getAll(): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(this.baseUrl);
  }

  // Récupérer un livre par ID
  get(id: number): Observable<LivreType> {
    return this.http.get<LivreType>(`${this.baseUrl}/${id}`);
  }

  // Créer un livre
  create(dto: LivreDTO): Observable<LivreType> {
    return this.http.post<LivreType>(this.baseUrl, dto);
  }

  // Mettre à jour un livre
  update(id: number, dto: LivreDTO): Observable<LivreType> {
    return this.http.put<LivreType>(`${this.baseUrl}/${id}`, dto);
  }

  // Supprimer un livre
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Recherche par titre ou auteur
  search(query: string): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(`${this.baseUrl}/search?q=${query}`);
  }

  getAllPaged(page: number, size: number, sortBy: string, direction: string) {
    return this.http.get<any>(
      `${this.baseUrl}/paged?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
  }

  searchPaged(query: string, page: number, size: number, sortBy: string, direction: string) {
    return this.http.get<any>(
      `${this.baseUrl}/search-paged?q=${query}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
  }
}
