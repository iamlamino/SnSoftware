import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../services/utilisateur';
import { Categorie } from '../services/categorie';
import { Livre } from '../services/livre';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css'],
})
export class DashboardHomeComponent implements OnInit {
  nbLivres: number = 0;
  nbUsers: number = 0;
  nbCategories: number = 0;

  constructor(
    private router: Router,
    private livreService: Livre,
    private userService: Utilisateur,
    private categorieService: Categorie
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    this.livreService.getAll().subscribe((livres) => {
      this.nbLivres = livres.length;
    });

    this.userService.getAll().subscribe((users) => {
      this.nbUsers = users.length;
    });

    this.categorieService.getAll().subscribe((categories) => {
      this.nbCategories = categories.length;
    });
  }

  goTo(path: string) {
    this.router.navigate(['/dashboard/' + path]);
  }
}
