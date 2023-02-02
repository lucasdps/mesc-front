
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gerencia } from '../../modulos/gerencia/gerencia';
import { environment } from 'src/environments/environment';
import { tap, delay, take } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GerenciaService {

  private readonly API = `${environment.API}gerencia`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Gerencia[]>(`${this.API}`).pipe(delay(0), tap(console.log));
  }

  loadById(id){
    return this.http.get<Gerencia>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(gerencia) {

    console.log(JSON.stringify( gerencia));
    return this.http.post(`${this.API}`,gerencia).pipe(take(1),  tap(console.log));
  }

  private update(gerencia){
    return this.http.put(`${this.API}/${gerencia.id}`, gerencia).pipe(take(1), tap(console.log));
  }

  save(gerencia){
    if(gerencia.id){
      return this.update(gerencia);
    }
    else{
      gerencia.id = 0;
      return this.create(gerencia);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
