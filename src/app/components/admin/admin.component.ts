import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { inject, Injectable } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../Shared/footer/footer.component";
import { ChartsComponent } from "../charts/charts.component";
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormComponent } from '../../Shared/form/form.component';
import { AuthService } from '../../services/authservice.service';
import { ProvinciasService } from '../../services/provincias.service';


@Component({
  selector: 'app-admin',
  imports: [RouterLink, FormsModule, CommonModule, NgSelectComponent, FooterComponent,TitleCasePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
provservice = inject(ProvinciasService)
TotalMiembro: number = 0;
auth = inject(AuthService)
usuario = this.auth.getUserName();
idusuario = Number(this.auth.GetIdUsuario());
admin = this.auth.isAdmin();
total!: number;
ngOnInit(): void {
  this.getpersonas();
  this.Cantmiembros();
  this.GetProv();
  this.SelectPPU();
  this.GetProvpid();
  this.TotalMiembrosPorUs();
  this.Miembrosporprov();
  //console.log(this.personas)
  //this.Find();

}
service = inject(PersonasService);
//Miembros
totalmiembros: any = [];
personas: any[] = [];
personaspu: any[] = [];
Buscar:string = "";
//Provincias 
provincias: any = [];  
buscarprov!: string;
provselect: any = []; 
provfiltradas!: any;;
prov: any = []; 
propid: any = [];

pleople: string = "";
FindPeople: any[] = [];
FindName(){
  const word = this.pleople.toLowerCase().trim();
  this.FindPeople = this.personas.filter((p:any) =>
    p.nombre.toLowerCase().includes(word)
  );
}
Miembrosporprov(){
  this.service.Charts().subscribe( m=> {
    this.totalmiembros = m;
})
}
FindTerritory(){
  if(this.buscarprov == null){
    this.getpersonas()
  }
const prov = this.buscarprov.toLowerCase().trim();
this.FindPeople = this.personas.filter((t:any) => 
  t.provincia.toLowerCase().includes(prov)
);

}
getpersonas(){
this.service.getpersonas().subscribe(data =>{
  this.personas = data;
  this.FindPeople = [...this.personas]
})
}
pers: string = "";
PeoplePerId: any[] = [];
FindPerId(){
  const per = this.pers.toLowerCase().trim();
  this.PeoplePerId = this.personaspu.filter((p:any) => 
    p.nombre.toLowerCase().includes(per)
  );
}
FindTerritoryPID(){
  if(this.buscarprov == null){
    this.SelectPPU()
  }
const prov = this.buscarprov.toLowerCase().trim();
this.PeoplePerId = this.personaspu.filter((t:any) => 
  t.provincia.toLowerCase().includes(prov)
);
  }
SelectPPU(){
this.service.GetPPU(this.idusuario).subscribe( p => {
  this.personaspu = p;
  //console.log('ID Usuario:', this.auth.GetIdUsuario());
  this.PeoplePerId = [...this.personaspu]

})
}
TotalMiembrosPorUs(){
  this.service.GettotalMiembrosPorUsuario(this.idusuario).subscribe(t => {
    this.total = t;
  })
}

GetProvpid(){
  this.provservice.GetProvpu(this.idusuario).subscribe( p => {
    this.propid = p;
  })
}
FiltrarProvincias(nombre: string) {
  if (!nombre) { 
    this.getpersonas(); 
  } else {
    this.service.Filtrarprov(nombre).subscribe(p => {
      this.personas = p;
    });
  }
}
guardar(person:any){
this.service.postpersonas(person).subscribe(()=>{
this.service.warning("Exito","Datos guardados exitosamente","green");
})
}
GetProv(){
  this.service.GetProvincias().subscribe(p => {
    this.provincias = p;
  })
}
Cantmiembros(){
  this.service.TotalMiembros().subscribe( cant => {
    this.TotalMiembro = cant;
  })
}
FiltrarProv(nombre: string){
this.service.Filtrarprov(nombre).subscribe(name => {
  this.prov = name;
})
}
BuscarPersonas(nombre:any){
  this.service.FiltrarPersonas(nombre).subscribe(name =>{
this.personas = name;
  })
  if(nombre == ""){
    this.getpersonas();
  }
}
ExportToExcel(): void{
  Swal.fire({
    title:"Descargar a Excel?",
    text: "Seguro desea descargar el archivo?",
    icon: "question",
    showCancelButton: true,
    cancelButtonColor: "red",
  }).then(res =>{
    if(res.isConfirmed){
const element = document.getElementById('TablaPersonas');
     // Eliminar la columna de acciones antes de exportar
  const tableClone = element?.cloneNode(true) as HTMLTableElement;
  tableClone.querySelectorAll('.no-export').forEach(el => el.remove());
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Provincias');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'Personas.xlsx');
    }
  })
   
}

borrar(id:number){
Swal.fire({
  title:"Seguro",
  text:"Seguro desea borrar los datos?",
  icon:"question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: "red",
}).then((result) =>{
  if(result.isConfirmed){
    this.service.SetPersona(id).subscribe(()=>{
 this.service.warning("Exito!","Datos borrados existosamente!","green");
this.getpersonas();
this.Cantmiembros();

})

  }
})
 
}
cargarpersona(id: number){
  this.service.getpersona(id).subscribe({
    next:(data)=>{
    }
  })
}
}
