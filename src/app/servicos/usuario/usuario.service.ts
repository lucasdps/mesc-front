import { Usuario } from './../../modulos/usuario/usuario';
import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = `${environment.API}usuario`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.API).pipe(delay(2000), tap(console.log));
  }

  loadById(id){
    return this.http.get<Usuario>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(usuario) {

    return this.http.post(this.API, usuario).pipe(take(1));
  }

  private update(usuario){
    return this.http.put(`${this.API}/${usuario.id}`, usuario).pipe(take(1));
  }

  save(usuario){
    if(usuario.id){
      return this.update(usuario);
    }
    else{
      return this.create(usuario);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
