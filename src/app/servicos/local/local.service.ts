import { delay, tap, take } from 'rxjs/operators';
import { Local } from './../../modulos/local/local';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private readonly API = `${environment.API}local`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Local[]>(`${this.API}`).pipe(delay(2000), tap(console.log));
  }

  loadById(id){
    return this.http.get<Local>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(local) {

    return this.http.post(`${this.API}`, local).pipe(take(1));
  }

  private update(local){
    return this.http.put(`${this.API}/${local.id}`, local).pipe(take(1));
  }

  save(local){
    if(local.id){
      return this.update(local);
    }
    else{
      local.id = 0;
      return this.create(local);
    }
  }

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
