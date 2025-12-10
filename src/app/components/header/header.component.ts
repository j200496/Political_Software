import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
//bg-primary bg-opacity-75
  logoff(){
this.service.confirmruta("Log out?","Seguro desea salir?","/")
  }
}
