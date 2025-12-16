import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PersonasService } from './personas.service';
import { credenciales } from '../components/Core/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7052/api/Auth';
  
  http = inject(HttpClient);
  alert = inject(PersonasService);

isAdmin(): boolean {
  return localStorage.getItem('rol') === 'Administrador';
}

isEmpleado(): boolean {
  return localStorage.getItem('rol') === 'Empleado';
}

getUserName(){
  return localStorage.getItem('usuario');
}

GetIdUsuario(){
  return localStorage.getItem('idusuario');
}
  Login(credenciales: credenciales): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credenciales).pipe(
      tap((resp: any) => {     
        // Guardar token
        localStorage.setItem('token', resp.token);

        // Guardar rol
        localStorage.setItem('rol', resp.rol);

        // Guardar usuario
        localStorage.setItem('usuario', resp.usuario);
        
        // Guardar Id
       localStorage.setItem("idusuario", resp.idusuario);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    localStorage.removeItem('idusuario');
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }
}
