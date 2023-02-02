import { SolicitacaoRvt } from './../modulos/solicitacao-rvt/solicitacao-rvt';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoRvtService {

  private readonly API = `${environment.API}solicitacaoRvt`;
  private readonly NOAPI = `${environment.NOAPI}solicitacaoRvt`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<SolicitacaoRvt[]>(this.API).pipe(delay(500), tap(console.log));
  }

  loadById(id){
    return this.http.get<SolicitacaoRvt>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(solicitacaoRvt) {
    return this.http.post(`${this.API}/`, solicitacaoRvt).pipe(take(1));
  }

  private update(solicitacaoRvt){
    return this.http.put(`${this.API}/${solicitacaoRvt.id}`, solicitacaoRvt).pipe(take(1));
  }

  save(solicitacaoRvt){
    if(solicitacaoRvt.id && solicitacaoRvt.id != 0){
      return this.update(solicitacaoRvt);
    }
    else{
      return this.create(solicitacaoRvt);
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
    return this.http.get<SolicitacaoRvt[]>(`${this.NOAPI}/RetornarEstoqueSAPPorNPNM?tipo=${tipo}&NPNMs=${NPNMs}` ).pipe(delay(0), tap(console.log));
  }

}
