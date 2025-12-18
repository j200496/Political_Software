import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from '../../services/personas.service';
import { AuthService } from '../../services/authservice.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
usuario = '';
contrasena = '';
mensajeError = '';
loading = false;
  alert = inject(PersonasService)
  auth = inject(AuthService)
  router = inject(Router)
  admin = this.auth.isAdmin();
  equipo = this.auth.isEmpleado();
  login() {
  const body = {
  usuario: this.usuario,
  contraseña: this.contrasena  
};
if(this.usuario == "" || this.contrasena == ""){
this.alert.error("Campos vacios!", "Por favor verifique los campos","red");
return;
}
  this.loading = true;
  this.auth.Login(body).subscribe({
      next: (resp) => {
          this.loading = false;
          const rol = resp.rol;
          if(rol === "Administrador"){
        this.router.navigate(['layout/admin']);
          }
          else{
            this.router.navigate(['layout/equipo']);
          }
      },
        error: (err) => {
      this.loading = false;
      if (err.status === 401) {
        this.alert.error('Error','Usuario o contraseña incorrectos!','red');
        this.mensajeError = 'Usuario o contraseña incorrectos';
      } else {
         this.alert.error('Error','Error del servidor, intente más tarde!','red');
        this.mensajeError = 'Error del servidor, intente más tarde';
      }
    }
  });
}
}