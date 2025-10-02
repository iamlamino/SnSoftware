import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Categorie, CategorieType } from '../../services/categorie';

@Component({
  standalone: true,
  selector: 'app-categorie-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-list.html',
  styleUrls: ['./categorie-list.css'],
})
export class CategorieList {
  categories: CategorieType[] = [];
  loading = false;
  error = '';
  successMsg = '';
  searchQuery = '';

  constructor(private categorieService: Categorie, private router: Router) {
    this.load();
  }

  load() {
    this.loading = true;
    this.categorieService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (l) => (this.categories = l),
        error: (err) => {
          console.error(err);
          this.error = 'Impossible de récupérer la liste des catégories.';
        },
      });
  }

  onSearch(query: string) {
    if (!query) {
      this.load();
      return;
    }

    this.categorieService.search(query).subscribe({
      next: (res) => (this.categories = res),
      error: () => (this.error = 'Erreur lors de la recherche.'),
    });
  }

  goNew() {
    this.router.navigate(['dashboard/categorie/new']);
  }

  goEdit(c: CategorieType) {
    if (!c.id) return;
    this.router.navigate(['dashboard/categorie/edit', c.id]);
  }

  delete(c: CategorieType) {
    if (!c.id) return;
    if (!confirm(`Supprimer la catégorie "${c.nom}" ?`)) return;

    this.categorieService.delete(c.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      },
    });
  }

  goBooks() {
    this.router.navigate(['dashboard/books']);
  }

  goUsers() {
    this.router.navigate(['dashboard/users']);
  }
}
