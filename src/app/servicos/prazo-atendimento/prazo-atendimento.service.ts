import { delay, take, tap } from 'rxjs/operators';
import { PrazoAtendimento } from './../../modulos/prazo-atendimento/prazo-atendimento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrazoAtendimentoService {

  private readonly API = `${environment.API}prazoAtendimento`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<PrazoAtendimento[]>(`${this.API}`).pipe(delay(500), tap(console.log));
  }

  loadById(id){
    return this.http.get<PrazoAtendimento>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(prazoAtendimento) {

    return this.http.post(`${this.API}`, prazoAtendimento).pipe(take(1));
  }

  private update(prazoAtendimento){
    return this.http.put(`${this.API}/${prazoAtendimento.Id}`, prazoAtendimento).pipe(take(1));
  }

  save(prazoAtendimento){

    if(prazoAtendimento.Id){
      console.log('update Prazo Atendimento ' + prazoAtendimento);
      return this.update(prazoAtendimento);
    }
    else{
      return this.create(prazoAtendimento);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}

