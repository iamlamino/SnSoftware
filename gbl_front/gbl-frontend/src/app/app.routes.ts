import { Routes } from '@angular/router';
import { categoriesRoutes } from './categories/categories.routes';
import { BookDetail } from './books/book-detail/book-detail';

export const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.routes').then((m) => m.usersRoutes) },
  { path: 'books', loadChildren: () => import('./books/books.routes').then((m) => m.booksRoutes) },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.routes').then((m) => m.categoriesRoutes),
  },
  {
    path: 'categorie/new',
    loadChildren: () => import('./categories/categories.routes').then((m) => m.categoriesRoutes),
  },
  {
    path: 'categorie/edit/:id',
    loadChildren: () => import('./categories/categories.routes').then((m) => m.categoriesRoutes),
  },
  /*{
    path: 'books/detail/:id',
    loadChildren: () => import('./books/book-detail/book-detail').then((m) => m.BookDetail),
  },*/
  { path: 'books/detail/:id', component: BookDetail },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
