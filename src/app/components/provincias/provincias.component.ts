import { Component,inject, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Provincias } from '../Core/Provincias';
import { UsuariosService } from '../../services/usuarios.service';
import { Province } from '../Core/Province';
import { PersonasService } from '../../services/personas.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-provincias',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,TitleCasePipe],
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
//this.CargarUsuarios()
}

form = new FormGroup({
  idProvincia: new FormControl(0),
 nombre: new FormControl('', { nonNullable: true }),
 meta: new FormControl(0)
})
dataProv: any = null;

GetProvincia(id: number) {
  this.isUpdate = true;
  this.provservice.GetunaProv(id).subscribe({
    next: (data) => {
     this.form.patchValue({
      idProvincia: data.idProvincia,
      nombre: data.nombre,
      meta: data.meta
     })
    },
    error: (err) => console.error('Error al obtener provincia:', err)
  });
}
UdtProv(){
  const prov = this.form.value;
  const id = prov.idProvincia;
   const {nombre, meta} = this.form.value;
  if(!nombre || !meta){
    this.alert.warning('Error!','No hay datos para actualizar!','red');
    return;
  }
  if(meta < 0){
        this.alert.warning('Error!','La cantidad debe ser mayor a 0!','red');
    return;
  }
this.provservice.EditProv(id!,prov).subscribe(() => {
  this.alert.success("Territorio editado Exitosamente!","Territorio editado","green");
   this.listaprovincias();
   this.Cancelar();
})
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
this.form.patchValue({
  nombre: "",
  meta: 0
})
}
listaprovincias(){
 this.provservice.GetProvincia().subscribe({
      next: (data) => {
        this.provincias = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al cargar provincias', err);
      }
    });
}
}
