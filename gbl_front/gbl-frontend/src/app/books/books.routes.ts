import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookForm } from './book-form/book-form';
import { provideHttpClient } from '@angular/common/http';

export const booksRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BookList, providers: [provideHttpClient()] }, // /books => liste
      { path: 'new', component: BookForm, providers: [provideHttpClient()] }, // /books/new => création
      { path: 'edit/:id', component: BookForm, providers: [provideHttpClient()] }, // /books/edit/1 => édition
    ],
  },
];
