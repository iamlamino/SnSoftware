import { Routes } from '@angular/router';
import { CategorieList } from './categorie-list/categorie-list';
import { CategorieForm } from './categorie-form/categorie-form';
import { provideHttpClient } from '@angular/common/http';

export const categoriesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategorieList, providers: [provideHttpClient()] }, // /categories => liste
      { path: 'new', component: CategorieForm, providers: [provideHttpClient()] }, // /categories/new => création
      { path: 'edit/:id', component: CategorieForm, providers: [provideHttpClient()] }, // /categories/edit/1 => édition
    ],
  },
];
