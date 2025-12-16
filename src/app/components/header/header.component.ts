import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonasService } from '../../services/personas.service';
import { AuthService } from '../../services/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
service = inject(PersonasService);
auth = inject(AuthService);
usuario = this.auth.getUserName();
admin = this.auth.isAdmin();
router = inject(Router)
//bg-primary bg-opacity-75
  Home(){
    const rol = localStorage.getItem('rol');
    if(rol === "Administrador"){
        this.router.navigate(['layout/admin']);
          }
          else{
            this.router.navigate(['layout/equipo']);
          }
  }
  logoff(){
this.service.confirmruta("Salir?","Seguro desea salir?","/")
this.auth.logout();
  }
}
