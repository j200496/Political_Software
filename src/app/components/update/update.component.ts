import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { FormComponent } from "../../Shared/form/form.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  imports: [FormComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
ngOnInit(): void {
this.servicio.getpersona(this.id).subscribe(persona =>{
  this.modelo = persona;
})
}
modelo?: any
@Input({transform: numberAttribute})
id!:number;
servicio = inject(PersonasService)
route = inject(Router);

guardar(person:any){
  this.servicio.actualizar(this.id,person).subscribe(() =>{
    this.servicio.warning("Exito!","Datos actualizados!","green");
 this.route.navigateByUrl('/layout/admin')
  })
}
}
