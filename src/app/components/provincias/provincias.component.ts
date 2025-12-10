import { Component,inject, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Provincias } from './Core/Provincias';
import { UsuariosService } from '../../services/usuarios.service';
import { Province } from './Core/Province';
import { PersonasService } from '../../services/personas.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-provincias',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './provincias.component.html',
  styleUrl: './provincias.component.css'
})
export class ProvinciasComponent implements OnInit {
nombre!: string;
isUpdate: boolean = false;
provincias: Provincias[] = [];
usuarios: any[] = [
  { idUsuario: 0, usuario: ''},
];
provservice = inject(ProvinciasService)
usuarioservice = inject(UsuariosService)
alert = inject(PersonasService)
ngOnInit(): void {
  this.listaprovincias();
this.CargarUsuarios()
}
prov: Province ={
  nombre:''
}

form = new FormGroup({
 nombre: new FormControl('', { nonNullable: true })
})
dataProv: any = null;

GetProvincia(id: number) {
  this.isUpdate = true;
  this.provservice.GetunaProv(id).subscribe({
    next: (data) => {
      this.dataProv = data;  
      this.CargarUsuarios();
    },
    error: (err) => console.error('Error al obtener provincia:', err)
  });
}

Borrar(id:number){
  Swal.fire({
    title:'Borrar?',
    text:'Seguro desea borrar los datos?',
    icon:'question',
    showCancelButton: true,
    cancelButtonText:'Cancelar',
    cancelButtonColor: 'red'
  }).then(res =>{
    if(res.isConfirmed){
  this.provservice.Deleteprov(id).subscribe(() => {
    this.listaprovincias()
  })
    }
  });

}
AgregarProv(){
  console.log(this.form.value)
const {nombre}= this.form.value;
if(!nombre){
  this.alert.warning("Hay campos vacios!","Error","red");
  return;
}

const pro = this.form.value as Province
// Envío de datos
  this.provservice.PostProvincia(pro).subscribe({
    next: () => {
      this.alert.warning("Datos agregados!", "Éxito", "blue");
      this.listaprovincias();
      this.form.reset({
        nombre: ''
      });
    },
    error: err => {
      console.error("Error al guardar", err);
      this.alert.warning("Error al guardar los datos", "Error", "red");
    }
  });
}
CargarUsuarios() {
  this.usuarioservice.Getusuarios().subscribe({
    next: (users) => {
      this.usuarios = users;
      // Ahora que el select tiene opciones, el patchValue sí funciona
      this.form.patchValue({
        nombre: this.dataProv.nombre
      });
    }
  });
}
Cancelar(){
this.isUpdate = false;
this.form.reset();
}
listaprovincias(){
 this.provservice.GetProvincia().subscribe({
      next: (data) => {
        this.provincias = data;
      },
      error: (err) => {
        console.error('Error al cargar provincias', err);
      }
    });
}
}
