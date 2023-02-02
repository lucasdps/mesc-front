import { AssociacaoCentroGerencia } from './../../modulos/associacao-centro-gerencia/AssociacaoCentroGerencia';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoCentroGerenciaService {

  private readonly API = `${environment.API}associacaoCentroGerencia`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<AssociacaoCentroGerencia[]>(`${this.API}`).pipe(delay(0), tap(console.log));
  }

  loadById(id){
    return this.http.get<AssociacaoCentroGerencia>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(associacaoCentroGerencia) {

    return this.http.post(`${this.API}`, associacaoCentroGerencia).pipe(take(1));
  }

  private update(associacaoCentroGerencia){
    return this.http.put(`${this.API}/${associacaoCentroGerencia.id}`, associacaoCentroGerencia).pipe(take(1));
  }

  save(associacaoCentroGerencia){
    if(associacaoCentroGerencia.id){
      return this.update(associacaoCentroGerencia);
    }
    else{
      associacaoCentroGerencia.id=0;
      if(!associacaoCentroGerencia.areaAtendida)
        associacaoCentroGerencia.areaAtendida = false;
      return this.create(associacaoCentroGerencia);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
