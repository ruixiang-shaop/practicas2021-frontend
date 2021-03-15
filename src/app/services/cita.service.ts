import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  
  constructor(private http: HttpClient) { }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.addCitaUrl, cita, this.httpOptions)
      .pipe(
        catchError(this.handleError<Cita>('addCita'))
      );
  }

  updateCita(cita: Cita): Observable<void> {
    return this.http.post<void>(this.updateCitaUrl, cita, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('updateCita'))
      );
  }

  deleteCita(cita: Cita): Observable<void> {
    const url = `${this.deleteCitaUrl}/${cita.id}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('deleteCita'))
      );
  }
}
