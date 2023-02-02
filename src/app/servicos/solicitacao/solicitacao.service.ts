import { Material } from './../../modulos/material/material';
import { Solicitacao } from './../../modulos/solicitacao/solicitacao';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {


  private readonly API = `${environment.API}solicitacao`;
  private readonly NOAPI = `${environment.NOAPI}solicitacao`;

  constructor(private http: HttpClient) { }

  public caminhoGet(){
    return this.API;
  }

  list() {
    return this.http.get<Solicitacao[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(id){
    return this.http.get<Solicitacao>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(d) {

    return this.http.post<Solicitacao>(`${this.API}`, d).pipe(take(1));
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

  SAPScriptNpNm(labelNPNM, listaNPNM) {
    return `${this.NOAPI}/MontarScriptBuscaEstoqueSAP?labelNPNM=${labelNPNM}&listaNPNM=${listaNPNM}`;
  }

  RetornarEstoqueSAPPorNPNM( tipo, NPNMs) {
    console.log('click para retornar estoque sap');
    return this.http.get<Material[]>(`${this.NOAPI}/RetornarEstoqueSAPPorNPNM?tipo=${tipo}&NPNMs=${NPNMs}` ).pipe(delay(0), tap(console.log));
  }
}
