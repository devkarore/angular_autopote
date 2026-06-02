import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';
import { CategorieForm } from './components/categorie-form/categorie-form';
import { BrandForm } from './components/brand-form/brand-form';
import { PartForm } from './components/part-form/part-form';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';



export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path: 'categorie-form', component: CategorieForm, canActivate: [authGuard]  },
  { path: 'brand-form', component: BrandForm, canActivate: [authGuard]  },
  { path: 'part-form', component: PartForm, canActivate: [authGuard]  },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
];