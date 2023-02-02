import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AssociacaoDepositoLocal } from '../../../modulos/associacao-deposito-local/associacao-deposito-local';
import { AssociacaoDepositoLocalService } from '../../../servicos/associacao-deposito-local/associacao-deposito-local.service';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoDepositoLocalResolverGuard implements Resolve<AssociacaoDepositoLocal> {
  constructor(private service: AssociacaoDepositoLocalService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssociacaoDepositoLocal> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      deposito: null,
      local: null
    });
  }

}
