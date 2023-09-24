import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormListComponent } from './components/products/form-list/form-list.component';
import { RegisterComponent } from './components/products/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'form-list', component: FormListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'updateRegister/:productId', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
