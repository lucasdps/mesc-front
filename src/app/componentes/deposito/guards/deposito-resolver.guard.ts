import { DepositoService } from './../../../servicos/deposito/deposito.service';
import { Deposito } from './../../../modulos/deposito/deposito';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositoResolverGuard implements Resolve<Deposito> {
  constructor(private service: DepositoService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposito> {
    if (route.params && route.params['Id']){
      console.log('snapp deposito ' + route.params['Id']);
      return this.service.loadById(route.params['Id']);
    }

    return of( {
      Id: null,
      CodigoSAP: null,
      Descricao: null,
      DescricaoSAP: null,
      CentroCodigo: null,
      TipoAtendimentoCodigo: null,
      Centro: null,
      TipoAtendimento: null
    });

  }
}
