import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MedicoComponent } from './components/medico/medico.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { RegisterMedicoComponent } from './components/register/register-medico/register-medico.component';
import { RegisterPacienteComponent } from './components/register/register-paciente/register-paciente.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'paciente', component: RegisterPacienteComponent },
      { path: 'medico', component: RegisterMedicoComponent }
    ]},
  { path: 'medico', component: MedicoComponent },
  { path: 'paciente', component: PacienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
