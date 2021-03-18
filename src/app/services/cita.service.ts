import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private addCitaUrl = '/api/citas/add';
  private updateCitaUrl = '/api/citas/update';
  private deleteCitaUrl = '/api/citas/delete';

  private cita: BehaviorSubject<Cita> = new BehaviorSubject<Cita>(null);
  
  constructor(private http: HttpClient) { }
  

  retrieveNewCita(): Observable<Cita> {
    return this.cita.asObservable();
  }

  sendNewCita(cita: Cita) { 
    this.cita.next(cita);  
  }

  addCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.addCitaUrl, cita, this.httpOptions);
  }

  updateCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.updateCitaUrl, cita, this.httpOptions);
  }

  deleteCita(cita: Cita): Observable<Cita> {
    const url = `${this.deleteCitaUrl}/${cita.id}`;
    return this.http.delete<Cita>(url, this.httpOptions);
  }
}
