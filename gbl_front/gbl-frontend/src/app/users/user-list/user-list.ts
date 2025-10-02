import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utilisateur, UtilisateurType } from '../../services/utilisateur';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
})
export class UserList {
  users: UtilisateurType[] = [];
  loading = false;
  error = '';
  searchQuery = '';

  constructor(private utilisateurService: Utilisateur, private router: Router) {
    this.load();
  }

  load() {
    this.loading = true;
    this.utilisateurService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (u) => (this.users = u),
        error: (err) => {
          console.error(err);
          this.error = 'Impossible de récupérer la liste.';
        },
      });
  }

  goNew() {
    this.router.navigate(['dashboard/users/new']);
  }

  goEdit(u: UtilisateurType) {
    if (!u.id) return;
    this.router.navigate(['dashboard/users/edit', u.id]);
  }

  delete(u: UtilisateurType) {
    if (!u.id) return;
    if (!confirm(`Supprimer ${u.nom} ${u.prenom} ?`)) return;

    this.utilisateurService.delete(u.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression.');
      },
    });
  }
  onSearch(query: string) {
    this.searchQuery = query;
    // appel service pour filtrer les utilisateurs
    this.utilisateurService.search(query).subscribe({
      next: (u) => (this.users = u),
      error: (err) => console.error(err),
    });
  }

  //chemins de navigation
  goBooks() {
    this.router.navigate(['dashboard/books']);
  }
  goCategories() {
    this.router.navigate(['dashboard/categorie']);
  }
}
