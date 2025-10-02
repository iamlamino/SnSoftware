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

  //pagination
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  sortBy = 'titre';
  direction = 'asc';

  constructor(private livreService: Livre, private router: Router) {
    this.load();
  }

  load() {
    this.loading = true;
    this.livreService
      .getAllPaged(this.currentPage, this.pageSize, this.sortBy, this.direction)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.livres = res.content;
          this.totalPages = res.totalPages;
        },
        error: () => (this.error = 'Impossible de récupérer la liste.'),
      });
  }
  onSearch(query: string) {
    if (!query) {
      this.load();
      return;
    }

    this.livreService.search(query).subscribe({
      next: (res) => (this.livres = res),
      error: () => (this.error = 'Erreur lors de la recherche'),
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.load();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.load();
    }
  }

  changeSort(field: string) {
    this.sortBy = field;
    this.load();
  }

  toggleDirection() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.load();
  }

  goNew() {
    this.router.navigate(['/dashboard/books/new']);
  }

  goEdit(l: LivreType) {
    if (!l.id) return;
    this.router.navigate(['/dashboard/books/edit', l.id]);
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

  goUsers() {
    this.router.navigate(['dashboard/users']);
  }
  goCategories() {
    this.router.navigate(['dashboard/categorie']);
  }
  goDetail(l: LivreType) {
    if (!l.id) return;
    this.router.navigate(['/dashboard/books', l.id]);
  }
  cancel(): void {
    this.router.navigate(['dashboard/users']);
  }
}
