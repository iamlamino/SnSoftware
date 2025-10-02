import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home';
import { BookList } from './books/book-list/book-list';
import { UserList } from './users/user-list/user-list';
import { CategorieList } from './categories/categorie-list/categorie-list';
import { BookForm } from './books/book-form/book-form';
import { CategorieForm } from './categories/categorie-form/categorie-form';
import { UserForm } from './users/user-form/user-form';
import { BookDetail } from './books/book-detail/book-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent }, // page des cartes

      //  LIVRES
      { path: 'books', component: BookList },
      { path: 'books/new', component: BookForm },
      { path: 'books/:id', component: BookDetail },
      { path: 'books/edit/:id', component: BookForm },

      //  CATÉGORIES
      { path: 'categorie', component: CategorieList },
      { path: 'categorie/new', component: CategorieForm },
      { path: 'categorie/edit/:id', component: CategorieForm },

      //  UTILISATEURS
      { path: 'users', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/edit/:id', component: UserForm },
    ],
  },

  // Fallback
  { path: '**', redirectTo: '/dashboard' },
];
