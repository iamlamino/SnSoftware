import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserForm } from './user-form/user-form';
import { provideHttpClient } from '@angular/common/http';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserList,
    providers: [provideHttpClient()], // ← Ajoute cette ligne
  },
  {
    path: 'new',
    component: UserForm,
    providers: [provideHttpClient()], // ← Et ici aussi
  },
  {
    path: 'edit/:id',
    component: UserForm,
    providers: [provideHttpClient()], // ← Encore ici
  },
];
