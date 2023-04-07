import { Resultado, VisaoDia } from './../../modulos/resultado/resultado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  private readonly API = `${environment.API}resultado`;

  constructor(private http: HttpClient) { }


  loadById(id){
    return this.http.get<Resultado>(`${this.API}/${id}`).pipe(take(1));
  }

  loadByIdEntrada(id){
    return this.http.get<Resultado>(`${this.API}/GetByEntrada/${id}`).pipe( tap(console.log));
  }

  loadByIdResultadoTipo(id, tp){
    return this.http.get(`${this.API}/GetByResultadoTipo?id=${id}&tp=${tp}`).pipe( tap(console.log));
  }

  listar(){
    return this.http.get<Resultado>(`${this.API}`).pipe( tap(console.log));
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }


}
