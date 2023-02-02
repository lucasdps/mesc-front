import { Injectable } from '@angular/core';
import { AssociacaoDepositoLocal } from '../../modulos/associacao-deposito-local/associacao-deposito-local';
import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoDepositoLocalService {

  private readonly API = `${environment.API}AssociacaoDepositoLocal`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<AssociacaoDepositoLocal[]>(`${this.API}`).pipe(delay(0), tap(console.log));
  }

  loadById(id){
    return this.http.get<AssociacaoDepositoLocal>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(associacaoDepositoLocal) {

    return this.http.post(`${this.API}/`, associacaoDepositoLocal).pipe(take(1));
  }

  private update(associacaoDepositoLocal){
    return this.http.put(`${this.API}/${associacaoDepositoLocal.id}`, associacaoDepositoLocal).pipe(take(1));
  }

  save(associacaoDepositoLocal){
    if(associacaoDepositoLocal.id){
      return this.update(associacaoDepositoLocal);
    }
    else{
      associacaoDepositoLocal.id=0;
      return this.create(associacaoDepositoLocal);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
