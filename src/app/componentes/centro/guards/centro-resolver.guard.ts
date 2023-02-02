import { Centro } from './../../../modulos/centro/centro';
import { CentroService } from 'src/app/servicos/centro/centro.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CentroResolverGuard implements Resolve<Centro> {
  constructor(private service: CentroService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Centro> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      Id: null,
      P1: null,
      P2: null,
      P3: null,
      Descricao: null,
      QtdEquipamentos: null,
      QtdOperacoes: null,
      QtdFP: null,
      QtdFS: null
    });

  }

}
