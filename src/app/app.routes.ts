import { Routes } from '@angular/router';
import { CompareComponent } from './components/compare/compare.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'compare/:value', component: CompareComponent },
  { path: 'my-list', component: ShoppingListComponent },
  { path: '**', component: IndexComponent }
];
