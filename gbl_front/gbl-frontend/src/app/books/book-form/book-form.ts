import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Livre, LivreType } from '../../services/livre';
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

  constructor(
    private fb: FormBuilder,
    private livreService: Livre,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // Initialisation du formulaire
    this.form = this.fb.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      datePublication: [''],
      isbn: [''],
      description: [''],
    });

    // Si on est en mode édition, charger le livre existant
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
          if (livre) this.form.patchValue(livre);
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

    // Transformation du payload pour supprimer les null/undefined
    const payload: LivreType = {
      titre: this.form.value.titre || '',
      auteur: this.form.value.auteur || '',
      datePublication: this.form.value.datePublication || '',
      isbn: this.form.value.isbn || '',
      description: this.form.value.description || '',
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
        setTimeout(() => this.router.navigate(['/books']), 1500); // délai pour voir le message
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la sauvegarde.';
      },
    });
  }
}
