import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Livre, LivreType } from '../../services/livre';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookList {
  livres: LivreType[] = [];
  loading = false;
  error = '';
  successMsg = '';
  searchQuery = '';

  constructor(private livreService: Livre, private router: Router) {
    this.load();
  }

  load() {
    this.loading = true;
    this.livreService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (l) => (this.livres = l),
        error: (err) => {
          console.error(err);
          this.error = 'Impossible de récupérer la liste.';
        },
      });
  }
  onSearch(query: string) {
    if (!query) {
      this.load(); // si la barre vide, on recharge tout
      return;
    }

    this.livreService.search(query).subscribe({
      next: (res) => (this.livres = res),
      error: (err) => (this.error = 'Erreur lors de la recherche'),
    });
  }

  goNew() {
    this.router.navigate(['/books/new']); // doit correspondre au path
  }

  goEdit(l: LivreType) {
    if (!l.id) return;
    this.router.navigate(['/books/edit', l.id]);
  }
  delete(l: LivreType) {
    if (!l.id) return;
    if (!confirm(`Supprimer ${l.titre} ?`)) return;

    this.livreService.delete(l.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      },
    });
  }
}
