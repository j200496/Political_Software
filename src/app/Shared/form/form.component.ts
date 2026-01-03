import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { inject, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authservice.service';
import { ProvinciasService } from '../../services/provincias.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Input() modelo?: any

IdUsuario: string | null = null;
ngOnInit(): void {

  if(this.modelo !== undefined){
    this.usuariosform.patchValue(this.modelo);
  }
  this.service.GetProvincias().subscribe(prov =>{
    this.provincias = prov;
    })
    this.Getpropid();
}
usuariosform = new FormGroup({
  idPersona: new FormControl(0),
  nombre: new FormControl(""),
  telefono: new FormControl(""),
  direccion: new FormControl(''),
  genero: new FormControl(''),
  cedula: new FormControl("",[Validators.required, Validators.minLength(11)]),
  idProvincia: new FormControl(null) 
});
@Input()
titulo!: string;
@Input() btn!: string;
@Input() btncolor!: string;
@Input() btncolor2!: string;
@Input() titulo2!: string;
@Input() btn2!:string;
@Output() metodo = new EventEmitter<any>();
service = inject(PersonasService)
auth = inject (AuthService)
route = inject(Router)
provservice = inject(ProvinciasService)
provincias: any = [];
provpid: any = [];
idusuario = Number(this.auth.GetIdUsuario())
admin = this.auth.isAdmin()
@Input() btncancel: boolean = false;

Ruta(){
  const rol = localStorage.getItem('rol');
  if(rol == 'Administrador'){
   this.route.navigateByUrl('layout/admin')
  }else{
    this.route.navigateByUrl('layout/equipo')
  }
}
Getpropid(){
  this.provservice.GetProvpu(this.idusuario).subscribe(p => {
    this.provpid = p;
  })
}
guardar(){
  const {nombre,telefono,direccion,cedula, genero, idProvincia} = this.usuariosform.value;
  if(!nombre || !telefono || !direccion || !cedula || !genero){
    this.service.error("Todos los campos son requeridos","Error!","red");
    return;
  }
if(!idProvincia){
  this.service.error("Debe elegir una provincia","Error","red");
  return;
}
   const formulario = this.usuariosform.value;
   this.metodo.emit(formulario);
   this.usuariosform.patchValue({
    nombre:'',
    telefono:'',
    direccion:'',
    cedula:'',
    genero:'',
    idProvincia: null
   })

}

}
