import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MedicoRegistro } from '../models/medicoRegistro';
import { catchError } from 'rxjs/operators';
import { PacienteRegistro } from '../models/pacienteRegistro';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsPlainText = {
    headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
  };
  
  private registerMedicoUrl = '/api/medicos/add';
  private registerPacienteUrl = '/api/pacientes/add';
  private uniqueUsuarioUrl = 'api/usuarios/usuarioExists';
  
  constructor(private http: HttpClient) { }

  addMedico(medico: MedicoRegistro): Observable<Medico> {
    return this.http.post<Medico>(this.registerMedicoUrl, medico, this.httpOptions);
  }
  /** POST: add a new medico to the server */
  addPaciente(paciente: PacienteRegistro): Observable<Paciente> {
    return this.http.post<Paciente>(this.registerPacienteUrl, paciente, this.httpOptions);
  }

  checkIfUsuarioExists(username: string): Observable<string> {
    return this.http.post<string>(this.uniqueUsuarioUrl, username, this.httpOptionsPlainText);
  }

}
