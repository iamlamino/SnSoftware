import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre, LivreType } from '../../services/livre';

@Component({
  standalone: true,
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
})
export class BookDetail {
  livre?: LivreType;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private livreService: Livre, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.load(id);
    }
  }

  load(id: number) {
    this.loading = true;
    this.livreService.get(id).subscribe({
      next: (data) => {
        this.livre = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger le livre.';
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['dashboard/books']);
  }
}
