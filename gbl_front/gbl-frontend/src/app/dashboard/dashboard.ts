import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Livre } from '../services/livre';
import { Categorie } from '../services/categorie';
import { Utilisateur } from '../services/utilisateur';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  totalLivres = 0;
  totalUsers = 0;
  totalCategories = 0;

  constructor(
    private livreService: Livre,
    private userService: Utilisateur,
    private categorieService: Categorie,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.livreService.getAll().subscribe((l) => (this.totalLivres = l.length));
    this.userService.getAll().subscribe((u) => (this.totalUsers = u.length));
    this.categorieService.getAll().subscribe((c) => (this.totalCategories = c.length));
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
