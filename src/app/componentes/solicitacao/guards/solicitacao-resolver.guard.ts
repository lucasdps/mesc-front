import { SolicitacaoService } from './../../../servicos/solicitacao/solicitacao.service';
import { Solicitacao } from './../../../modulos/solicitacao/solicitacao';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoResolverGuard implements Resolve<Solicitacao> {
  constructor(private service: SolicitacaoService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Solicitacao> {
    if (route.params && route.params['id']){
      console.log('snapp deposito ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      Id:null,
      Assunto: null,
      As:null,
      Om: null,
      TipoCriticidade: 'N',
      JustificativaEmergencia: null,
      StatusSolicitacao: null,
      DataSolicitacao: null,
      Observacao: null,
      TipoMaterial: 'E',
      TipoNpNm: null,
    });

  }

}
