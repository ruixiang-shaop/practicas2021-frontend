import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class UpdateAfterLoginService {
  private medico: BehaviorSubject<Medico> = new BehaviorSubject<Medico>(new Medico())
  private paciente: BehaviorSubject<Paciente> = new BehaviorSubject<Paciente>(new Paciente())

  constructor() { }

  setMedico(medico: Medico) {
    this.medico.next(medico);
  }

  getMedico(): Observable<Medico> {
    return this.medico.asObservable();
  }

  setPaciente(paciente: Paciente) { 
    this.paciente.next(paciente);  
  }

  getPaciente(): Observable<Paciente> {
    return this.paciente.asObservable();
  }

}
