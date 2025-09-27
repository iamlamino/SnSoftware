import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.routes').then((m) => m.usersRoutes) },
  { path: 'books', loadChildren: () => import('./books/books.routes').then((m) => m.booksRoutes) }, // ajout des livres
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
