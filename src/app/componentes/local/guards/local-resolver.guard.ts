import { LocalService } from './../../../servicos/local/local.service';
import { Local } from './../../../modulos/local/local';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalResolverGuard implements Resolve<Local> {
  constructor(private service: LocalService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Local> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      descricao: null,
      canteiro: null
    });

  }

}
