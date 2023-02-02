import { tap, take } from 'rxjs/operators';
import { Material } from './../../modulos/material/material';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly API = `${environment.API}material`;
  private readonly NOAPI = `${environment.NOAPI}material`;

  constructor(private http: HttpClient) { }


  loadBySolicitacaoId(id){
    return this.http.get<Material[]>(`${this.NOAPI}/GetMateriaisBySolicitacaoId?id=${id}`).pipe(tap(console.log));
  }

  list() {
    return this.http.get<Material[]>(`${this.API}`).pipe( tap(console.log));
  }

  loadById(id){
    return this.http.get<Material>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(d) {

    return this.http.post(`${this.API}`, d).pipe(take(1));
  }

  private update(d){
    return this.http.put(`${this.API}/${d.Id}`, d).pipe(take(1));
  }

  save(d, isCreate){
    if(!isCreate){
      return this.update(d);
    }
    else{
      return this.create(d);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
