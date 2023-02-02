import { SolicitacaoRvt } from './../../../modulos/solicitacao-rvt/solicitacao-rvt';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SolicitacaoRvtService } from 'src/app/servicos/solicitacao-rvt.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoRvtResolverGuard  implements Resolve<SolicitacaoRvt> {
  constructor(private service: SolicitacaoRvtService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SolicitacaoRvt> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      check: null,
      sap: null,
      np: null,
      nm: null,
      descricao: null,
      centro: null,
      unidade: null,
      deposito: null,
      saldoSAP: null,
      local: null,
      qtdSolicitada: null,
      npNm: null,
      assunto: null,
      numeroAS: null,
      numeroOrdem: null,
      tipoCriticidade: null,
      justificativaEmergencia: null,
      solicitacao: null,
      statusSolicitacao: null,
      dataSolicitacao: null,
      usuarioSolicitante: null,
      gerenciaSolicitante: null,
      justificativaASOrdem: null,
      observacao: null,
      tipoMaterial: null,
      tipoNpNm: null,

      dataPrazoAtendimento: null,
      reserva: null,
      itemReserva: null,
      ns: null,
      bp: null
    });

  }
}
