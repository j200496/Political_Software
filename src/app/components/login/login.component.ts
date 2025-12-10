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
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

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
  this.auth.login(body).subscribe({
      next: () => {
          this.loading = false;
        this.router.navigate(['layout/admin']);
      },
      error: () => {
        this.mensajeError = 'Usuario o clave incorrectos';
      }
    });
  }
}
