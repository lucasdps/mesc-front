import { GerenciaService } from './../../../servicos/gerencia/gerencia.service';
import { Gerencia } from 'src/app/modulos/gerencia/gerencia';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class GerenciaResolverGuard implements Resolve<Gerencia> {

  constructor(private service: GerenciaService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gerencia> {
    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      nome: null
    });

  }

}
