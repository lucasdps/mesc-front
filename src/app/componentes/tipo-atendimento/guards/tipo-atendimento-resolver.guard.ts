import { TipoAtendimentoService } from './../../../servicos/tipo-atendimento/tipo-atendimento.service';
import { TipoAtendimento } from './../../../modulos/tipo-atendimento/TipoAtendimento';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoAtendimentoResolverGuard implements Resolve<TipoAtendimento> {
  constructor(private service: TipoAtendimentoService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoAtendimento> {
    if (route.params && route.params['codigo']){
      console.log('snapp tipo atendimento ' + route.params['codigo']);
      return this.service.loadById(route.params['codigo']);
    }

    return of( {
      Codigo: null,
      Descricao: null
    });

  }

}
