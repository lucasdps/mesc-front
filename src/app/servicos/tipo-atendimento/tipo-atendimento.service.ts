import { tap, take } from 'rxjs/operators';
import { TipoAtendimento } from './../../modulos/tipo-atendimento/TipoAtendimento';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoAtendimentoService {


  private readonly API = `${environment.API}tipoAtendimento`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<TipoAtendimento[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(codigo){
    return this.http.get<TipoAtendimento>(`${this.API}/${codigo}`).pipe(take(1));
  }
  private create(centro) {
    return this.http.post(`${this.API}`, centro).pipe(take(1));
  }

  private update(centro){
    console.log(centro);
    return this.http.put(`${this.API}/${centro.Codigo}`, centro).pipe(take(1));
  }

  save(centro,isCreate){
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
