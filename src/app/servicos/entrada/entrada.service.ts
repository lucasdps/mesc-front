import { environment } from 'src/environments/environment';
import { Entrada, Operacao } from './../../modulos/entrada/entrada';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  private readonly API = `${environment.API}entrada`;
  private readonly API_CALCULO = `${environment.API}calculoprogramacaolinear`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Entrada[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(id){
    return this.http.get<Entrada>(`${this.API}/${id}`).pipe(take(1));
  }

  listaOperacoes(id){
    return this.http.get<Operacao[]>(`${this.API}/ListaOperacoes?id=${id}`).pipe();
  }

  CalcularProgramacaoLinear(id){
    return this.http.get(`${this.API_CALCULO}/${id}`).pipe(take(1));
  }

  private create(entrada) {

    return this.http.post(`${this.API}`, entrada).pipe(take(1));
  }

  private update(entrada){
    return this.http.put(`${this.API}/${entrada.Id}`, entrada).pipe(take(1));
  }

  save(isCreate, entrada){
    if(isCreate){
      return this.create(entrada);
    }
    else{

      return this.update(entrada);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
