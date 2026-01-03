import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { RouterLink } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { credenciales, usu, usuarios } from '../Core/usuarios';
import { FooterComponent } from '../../Shared/footer/footer.component';


@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FooterComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
serviceu = inject(UsuariosService);
service = inject(PersonasService);
formbuilder = inject(FormBuilder);

form = new FormGroup({
  idUsuario: new FormControl(0),
  usuario: new FormControl(""),
  contraseña: new FormControl(""),
  rol: new FormControl("Selecciona un rol")
})
usuarios: usu[] = [];
id!: number;
isupdate: boolean = false;
ngOnInit(): void {
this.getusers();
}
getusers(){
  this.serviceu.Getusuarios().subscribe({
   next:(user) => this.usuarios = user,
   error: (err) => console.error('Error fetching users:', err)
  })
}
Clear(){
this.form.patchValue({
   idUsuario: 0,
    usuario: "",
    contraseña: "",
    rol: "Selecciona un rol"
})
this.isupdate = false;
}
Guardar(){
if(this.isupdate == true){
 this.Actualizar();
}else if(this.isupdate == false){
  this.Saveuser();
}
}
Saveuser(){
  this.isupdate = false;
  const {usuario, contraseña,rol} = this.form.value;
  if(!usuario || !contraseña || !rol){
    this.service.error('Error','Todos los campos son requeridos','red');
    return;
  }
  if(rol == 'Selecciona un rol'){
this.service.error('Error','Selecciona un rol','red');
return;
  }
if (this.usuarios.some((u:any) => u.contraseña === contraseña)) {
  this.service.error("La contraseña ya existe", "Error", "red");
  return;
}

  const user = this.form.value;
  this.serviceu.PostUser(user).subscribe(() =>{
    this.service.success('Datos agregados!','Usuario agregado exitosamente!','blue');
    this.getusers();
  })
}
Borraruser(id:number){
Swal.fire({
  title:'Borrar?',
  text:'Seguro desea borrar el usuario?',
  icon:'question',
  showCancelButton: true,
  cancelButtonText:'Cancelar',
  cancelButtonColor: 'red'
}).then(res =>{
  if(res.isConfirmed){
this.serviceu.DeleteUser(id).subscribe(() => {
  this.getusers();
})
  }
});
}
Actualizar() {
  this.isupdate = true;
  const user = this.form.value;
  const id = user.idUsuario; 
  const {usuario, contraseña,rol} = this.form.value;
  if(!usuario || !contraseña){
    this.service.warning('Error!','No hay datos para actualizar!','red');
    return;
  }
    if(rol == 'Selecciona un rol'){
this.service.warning('Error','Selecciona un rol','red');
return;
  }

  if (!id || id <= 0) {
    console.error("ID inválido");
    return;
  }

  this.serviceu.PutUser(id, user).subscribe(() => {
   this.service.success("Datos actualizados","Datos actualizados exitosamente!","green");
   this.getusers();
   this.Clear();
   user.rol = "Seleccione un rol";
 
 this.isupdate = false;
  });
}
Cancel(){

}
getuser(id: number){
    this.isupdate =true;
this.serviceu.GetUser(id).subscribe({
  next:(data) =>{
    this.form.patchValue({
      idUsuario: data.idUsuario,
      usuario: data.usuario,
      contraseña:data.contraseña,
      rol: data.rol
    });
  }
})
}
}
