import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Centro } from './../../modulos/centro/centro';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  private readonly API = `${environment.API}entrada`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Centro[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(codigo){
    return this.http.get<Centro>(`${this.API}/${codigo}`).pipe(take(1));
  }
  private create(centro) {

    return this.http.post(`${this.API}`, centro).pipe(take(1));
  }

  private update(centro){
    return this.http.put(`${this.API}/${centro.Codigo}`, centro).pipe(take(1));
  }

  save(isCreate, centro){
    if(isCreate){
      return this.create(centro);
    }
    else{

      return this.update(centro);
    }
  }

  remove(codigo){
    return this.http.delete(`${this.API}/${codigo}`).pipe(take(1));
  }
}
