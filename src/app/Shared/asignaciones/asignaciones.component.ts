import { Component, OnInit,inject,Input,Output, EventEmitter } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-asignaciones',
  imports: [CommonModule],
  templateUrl: './asignaciones.component.html',
  styleUrl: './asignaciones.component.css'
})
export class AsignacionesComponent implements OnInit {
provservice = inject(ProvinciasService)
usuarioservice = inject(UsuariosService)
@Input() Lista!:string;
@Input() data: any[] = [];
@Input() idField: string = 'id'; 
@Input() textField: string = 'nombre';

@Output() SelectIdUsuario = new EventEmitter<number>();

ngOnInit(): void {

}
  

  onSelect(event: any) {
const id = Number(event.target.value);
 this.SelectIdUsuario.emit(id);
  }
}
