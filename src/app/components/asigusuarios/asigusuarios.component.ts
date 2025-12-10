import { Component,inject, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { AsignacionesComponent } from '../../Shared/asignaciones/asignaciones.component';
import { UsuariosService } from '../../services/usuarios.service';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-asigusuarios',
  imports: [AsignacionesComponent],
  templateUrl: './asigusuarios.component.html',
  styleUrl: './asigusuarios.component.css'
})
export class AsigusuariosComponent implements OnInit{
provservice = inject(ProvinciasService)
usuariosservice = inject(UsuariosService)
personasservice = inject(PersonasService)
provincias: any[] = [
  {idProvincia:0,nombre:''}
]
usuarios: any[] = [
  {idUsuario: 0, usuario:""}
]
IdUsuarioSelec = 0;
ProvSeleccionadas: number[] = []

ngOnInit(): void {
  this.Getprovincias();
  this.GetUsuarios();
}

GetUsuarios(){
  this.usuariosservice.Getusuarios().subscribe(u => {
    this.usuarios = u;
    console.log(u)
  })
}
Getprovincias(){
  this.provservice.GetProvincia().subscribe(p=> {
    this.provincias = p;
   // console.log(p)
  })
}
}
