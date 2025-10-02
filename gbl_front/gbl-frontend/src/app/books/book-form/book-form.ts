import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Livre, LivreDTO } from '../../services/livre';
import { Categorie, CategorieType } from '../../services/categorie';
import { finalize, switchMap, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css'],
})
export class BookForm {
  form: FormGroup;
  isEdit = false;
  currentId?: number;
  loading = false;
  error = '';
  successMsg = '';
  categories: CategorieType[] = [];

  constructor(
    private fb: FormBuilder,
    private livreService: Livre,
    private categorieService: Categorie,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Init form
    this.form = this.fb.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      datePublication: [''],
      isbn: [''],
      description: [''],
      categorieId: [null, Validators.required],
    });

    // Charger catégories
    this.categorieService.getAll().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Impossible de charger les catégories', err),
    });

    // Mode édition
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const idParam = params.get('id');
          if (idParam) {
            this.isEdit = true;
            this.currentId = Number(idParam);
            return this.livreService.get(this.currentId);
          }
          return of(null);
        })
      )
      .subscribe({
        next: (livre) => {
          if (livre) {
            this.form.patchValue({
              ...livre,
              categorieId: livre.categorie ? livre.categorie.id : null,
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Impossible de récupérer le livre.';
        },
      });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const payload: LivreDTO = {
      titre: this.form.value.titre || '',
      auteur: this.form.value.auteur || '',
      datePublication: this.form.value.datePublication || '',
      isbn: this.form.value.isbn || '',
      description: this.form.value.description || '',
      categorieId: this.form.value.categorieId, // un seul id
    };

    const request$ =
      this.isEdit && this.currentId
        ? this.livreService.update(this.currentId, payload)
        : this.livreService.create(payload);

    request$.pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => {
        this.successMsg = this.isEdit
          ? '✅ Livre modifié avec succès.'
          : '✅ Livre ajouté avec succès.';
        setTimeout(() => this.router.navigate(['/books']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la sauvegarde.';
      },
    });
  }
  cancel(): void {
    this.router.navigate(['dashboard/books']);
  }
}
