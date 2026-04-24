import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'account/accounts', loadComponent: () => import("./components/account/account.component").then(m => m.AccountComponent) }
];
