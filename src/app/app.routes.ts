import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';
import { CategorieForm } from './components/categorie-form/categorie-form';
import { BrandForm } from './components/brand-form/brand-form';

export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path: 'categorie-form', component: CategorieForm },
  { path: 'brand-form', component: BrandForm }
];