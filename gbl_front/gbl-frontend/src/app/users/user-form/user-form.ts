import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur, UtilisateurType } from '../../services/utilisateur';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
})
export class UserForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  userId?: number;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private utilisateurService: Utilisateur,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialisation du form AFTER injection du FormBuilder
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.minLength(6)]], // motDePasse facultatif en édition
      statut: ['ACTIF', [Validators.required]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.userId = Number(idParam);
      this.loadUser(this.userId);
    }
  }

  private loadUser(id: number) {
    this.loading = true;
    this.utilisateurService.getById(id).subscribe({
      next: (u) => {
        this.form.patchValue({
          nom: u.nom,
          prenom: u.prenom,
          email: u.email,
          statut: u.statut,
          motDePasse: '',
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = "Impossible de charger l'utilisateur.";
        this.loading = false;
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UtilisateurType = this.form.value as UtilisateurType;

    if (this.isEdit && (!payload.motDePasse || payload.motDePasse.trim() === '')) {
      delete (payload as Partial<UtilisateurType>).motDePasse;
    }

    this.loading = true;
    this.errorMsg = '';

    if (this.isEdit && this.userId != null) {
      this.utilisateurService.update(this.userId, payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['dashboard/users']);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Erreur lors de la mise à jour.';
          this.loading = false;
        },
      });
    } else {
      this.utilisateurService.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['dashboard/users']);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Erreur lors de la création.';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard/users']);
  }

  // helpers template
  get nom() {
    return this.form.get('nom');
  }
  get prenom() {
    return this.form.get('prenom');
  }
  get email() {
    return this.form.get('email');
  }
  get motDePasse() {
    return this.form.get('motDePasse');
  }
}
