import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UtilisateurType {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  statut: string;
}

@Injectable({ providedIn: 'root' })
export class Utilisateur {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UtilisateurType[]> {
    return this.http.get<UtilisateurType[]>(this.apiUrl);
  }

  getById(id: number): Observable<UtilisateurType> {
    return this.http.get<UtilisateurType>(`${this.apiUrl}/${id}`);
  }

  create(user: UtilisateurType): Observable<UtilisateurType> {
    return this.http.post<UtilisateurType>(this.apiUrl, user);
  }

  update(id: number, user: UtilisateurType): Observable<UtilisateurType> {
    return this.http.put<UtilisateurType>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
