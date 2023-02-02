import { EntradaService } from './../../../servicos/entrada/entrada.service';
import { Entrada } from './../../../modulos/entrada/entrada';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaResolverGuard implements Resolve<Entrada> {
  constructor(private service: EntradaService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entrada> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      p1: null,
      p2: null,
      p3: null,
      descricao: null,
      qtdEquipamentos: null,
      qtdOperacoes: null,
      qtdFP: null,
      qtdFS: null
    });

  }



}
