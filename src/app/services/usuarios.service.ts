import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
private urlusuarios = 'https://localhost:7052/api/Usuarios';
private urlequipo = 'https://localhost:7052/api/Usuarios/Equipo';
http = inject(HttpClient);

GetEquipo(): Observable <any[]>{
  return this.http.get<any>(`${this.urlequipo}`);
}
Getusuarios(): Observable <any[]>{
  return this.http.get<any>(this.urlusuarios);
}
GetUser(id: number): Observable<any>{
return this.http.get(`${this.urlusuarios}/${id}`);
}
PostUser(user: any){
return this.http.post(this.urlusuarios,user);
}
PutUser(id:number, user: any){
return this.http.put(`${this.urlusuarios}/${id}`,user)
}
DeleteUser(id: number){
return this.http.put(`${this.urlusuarios}/Borrar/${id}`,{});
}
}
