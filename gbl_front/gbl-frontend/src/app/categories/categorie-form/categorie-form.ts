import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, switchMap, of } from 'rxjs';
import { Categorie, CategorieType } from '../../services/categorie';

@Component({
  standalone: true,
  selector: 'app-categorie-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorie-form.html',
  styleUrls: ['./categorie-form.css'],
})
export class CategorieForm {
  form: FormGroup;
  isEdit = false;
  currentId?: number;
  loading = false;
  error = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private categorieService: Categorie,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
    });

    // Mode édition
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const idParam = params.get('id');
          if (idParam) {
            this.isEdit = true;
            this.currentId = Number(idParam);
            return this.categorieService.get(this.currentId);
          }
          return of(null);
        })
      )
      .subscribe({
        next: (cat) => {
          if (cat) {
            this.form.patchValue(cat);
          }
        },
        error: () => (this.error = 'Impossible de charger la catégorie.'),
      });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const payload: CategorieType = {
      nom: this.form.value.nom || '',
    };

    const request$ =
      this.isEdit && this.currentId
        ? this.categorieService.update(this.currentId, payload)
        : this.categorieService.create(payload);

    request$.pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => {
        this.successMsg = this.isEdit
          ? '✅ Catégorie modifiée avec succès.'
          : '✅ Catégorie ajoutée avec succès.';
        setTimeout(() => this.router.navigate(['dashboard/categorie']), 1500);
      },
      error: () => (this.error = 'Erreur lors de la sauvegarde.'),
    });
  }
  cancel() {
    this.router.navigate(['dashboard/categorie']);
  }
}
