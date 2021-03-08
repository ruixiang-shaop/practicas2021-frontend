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
import { ModalModule } from './shared/_modal';

import localeEs from '@angular/common/locales/es';
import { CitaPacienteComponent } from './components/cita-paciente/cita-paciente.component';
import { CitaMedicoComponent } from './components/cita-medico/cita-medico.component';
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
    CitaPacienteComponent,
    CitaMedicoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ModalModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
