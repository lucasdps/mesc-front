import { PrazoAtendimentoService } from './../../../servicos/prazo-atendimento/prazo-atendimento.service';
import { PrazoAtendimento } from './../../../modulos/prazo-atendimento/prazo-atendimento';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrazoAtendimentoResolverGuard implements Resolve<PrazoAtendimento> {
  constructor(private service: PrazoAtendimentoService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrazoAtendimento> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      Id: null,
      EscalaInicio: null,
      EscalaFim: null,
      DiasUteisNormal: null,
      DiasUteisEmergencia: null,
      TipoAtendimentoCodigo: null,
      TipoAtendimento: null

    });

  }

}
