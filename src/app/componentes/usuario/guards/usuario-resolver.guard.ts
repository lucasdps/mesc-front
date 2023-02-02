import { UsuarioService } from './../../../servicos/usuario/usuario.service';
import { Usuario } from './../../../modulos/usuario/usuario';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverGuard  implements Resolve<Usuario> {
  constructor(private service: UsuarioService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']){
      console.log('snapp ' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    return of( {
      id: null,
      nome: null,
      chave: null,
      gerencia: null,
      perfil: null
    });

  }
}
