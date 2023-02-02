import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AssociacaoCentroGerencia } from '../../../modulos/associacao-centro-gerencia/AssociacaoCentroGerencia';
import { AssociacaoCentroGerenciaService } from '../../../servicos/AssociacaoCentroGerencia/associacao-centro-gerencia.service';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoCentroGerenciaResolverGuard implements Resolve<AssociacaoCentroGerencia> {
  constructor(private service: AssociacaoCentroGerenciaService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssociacaoCentroGerencia> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      centro: null,
      centroDescricao: null,
      gerencia: null,
      areaAtendida: null
    });
  }

}
