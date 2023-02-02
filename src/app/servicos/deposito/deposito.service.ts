import { Deposito } from './../../modulos/deposito/deposito';
import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  private readonly API = `${environment.API}deposito`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Deposito[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(id){
    return this.http.get<Deposito>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(d) {

    return this.http.post(`${this.API}`, d).pipe(take(1));
  }

  private update(d){
    return this.http.put(`${this.API}/${d.Id}`, d).pipe(take(1));
  }

  save(d, isCreate){
    if(!isCreate){
      return this.update(d);
    }
    else{
      return this.create(d);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
