import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LivreType {
  id?: number;
  titre: string;
  auteur: string;
  datePublication?: string;
  isbn?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Livre {
  private baseUrl = 'http://localhost:8080/api/livres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(this.baseUrl);
  }

  get(id: number): Observable<LivreType> {
    return this.http.get<LivreType>(`${this.baseUrl}/${id}`);
  }

  create(l: LivreType): Observable<LivreType> {
    return this.http.post<LivreType>(this.baseUrl, l);
  }

  update(id: number, l: LivreType): Observable<LivreType> {
    return this.http.put<LivreType>(`${this.baseUrl}/${id}`, l);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  search(query: string): Observable<LivreType[]> {
    return this.http.get<LivreType[]>(`${this.baseUrl}/search?q=${query}`);
  }
}
