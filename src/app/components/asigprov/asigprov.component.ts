import { Component,inject, OnInit } from '@angular/core';
import { AsignacionesComponent } from '../../Shared/asignaciones/asignaciones.component';
import { UsuariosService } from '../../services/usuarios.service';
import { ChecklistComponent } from '../../Shared/checklist/checklist.component';
import { ProvinciasService } from '../../services/provincias.service';
import { PersonasService } from '../../services/personas.service';
import { usuarios } from '../Core/usuarios';

@Component({
  selector: 'app-asigprov',
  imports: [AsignacionesComponent,ChecklistComponent],
  templateUrl: './asigprov.component.html',
  styleUrl: './asigprov.component.css'
})
export class AsigprovComponent implements OnInit {
provservice = inject(ProvinciasService)
usuarioservice = inject(UsuariosService)
personasservice = inject(PersonasService)
usuarios: usuarios[] = [
  {IdUsuario:0,usuario:''}
]
provincia: any [] = [
  {IdProvincia:0,nombre:''}
]
provpu: any [] = [];
ngOnInit(): void {
  this.GetLista();
  this.Getlistaprov();
} 

GetProPU(id: number){
  this.provservice.GetProvpu(id).subscribe( p => {
  this.provpu = p;
  })
}
ProvSeleccionadas: number[] = [];

IdUsuarioSeleccionado: number = 0;
capturarUsuario(id: number) {
  this.IdUsuarioSeleccionado = id;
  this.provservice.GetProvinciasAsignadas(id).subscribe(ids => {
    this.ProvSeleccionadas = ids;  
  });

}

IdUsuarioSelec = 0;
AsignarProvincias() {
  const Dto = {
    IdUsuario: this.IdUsuarioSeleccionado,
    Provincias: this.ProvSeleccionadas
  };
  console.log(Dto);
  if (!this.IdUsuarioSeleccionado || this.ProvSeleccionadas.length === 0) {
    this.personasservice.error("Elija el usuario o territorio!", "Error", "red");
    return;
  }
  this.provservice.AsignarProv(Dto).subscribe({
    next: (res) => {
      this.personasservice.success("Asignación con éxito!", "Provincias asignadas exitosamente!", "green");
    },
    error: (err) => {
      console.error("Error en la asignación:", err);
    }
  });
}

Getlistaprov(){
  this.provservice.GetProvincia().subscribe(p => {
   this.provincia = p;
  })
}
GetLista(){
  this.usuarioservice.GetEquipo().subscribe(u => {
    this.usuarios = u;
  })
}
}
