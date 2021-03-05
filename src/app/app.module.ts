import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from "@angular/common";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterPacienteComponent } from './components/register/register-paciente/register-paciente.component';
import { RegisterMedicoComponent } from './components/register/register-medico/register-medico.component';
import { MedicoComponent } from './components/medico/medico.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { CitaComponent } from './components/cita/cita.component';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es')

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPacienteComponent,
    RegisterMedicoComponent,
    MedicoComponent,
    PacienteComponent,
    CitaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
