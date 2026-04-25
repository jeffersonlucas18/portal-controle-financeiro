import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'account/accounts', loadComponent: () => import("./components/account/account.component").then(m => m.AccountComponent) },
  { path: 'account/expenses/:id', loadComponent: () => import("./components/expense/expense.component").then(m => m.ExpenseComponent) },
];
