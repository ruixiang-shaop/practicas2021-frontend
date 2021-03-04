import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private loginUrl = '/api/auth';

  constructor(private http: HttpClient) { }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 401)
        return of(error.error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(usuario: Usuario): Observable<Paciente | Medico | String> {
    return this.http.post<Paciente | Medico | String>(this.loginUrl, usuario, this.httpOptions)
      .pipe(
        catchError(this.handleError<Paciente | Medico | String>('login'))
      )
  }
}
