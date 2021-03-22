import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Diagnostico } from '../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private newDiagnostico: BehaviorSubject<Diagnostico> = new BehaviorSubject<Diagnostico>(null);
  private updatedDiagnostico: BehaviorSubject<Diagnostico> = new BehaviorSubject<Diagnostico>(null);

  private addDiagnosticoUrl = '/api/diagnosticos/add';
  private updateDiagnosticoUrl = '/api/diagnosticos/update';
  
  constructor(private http: HttpClient) { }
  
  retrieveNewDiagnostico(): Observable<Diagnostico> {
    return this.newDiagnostico.asObservable();
  }

  sendNewDiagnostico(diagnostico: Diagnostico) { 
    this.newDiagnostico.next(diagnostico);  
  }
    
  retrieveUpdatedDiagnostico(): Observable<Diagnostico> {
    return this.updatedDiagnostico.asObservable();
  }

  sendUpdatedDiagnostico(diagnostico: Diagnostico) { 
    this.updatedDiagnostico.next(diagnostico);  
  }

  addDiagnostico(diagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.addDiagnosticoUrl, diagnostico, this.httpOptions);
  }

  updateDiagnostico(diagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.put<Diagnostico>(this.updateDiagnosticoUrl, diagnostico, this.httpOptions);
  }
}
