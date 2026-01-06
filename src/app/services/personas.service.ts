import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CantidadpGenero } from '../components/Core/CantidadpGenero';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
private urlpersonas = 'https://localhost:7052/api/Personas';
private urlprovincias = "https://localhost:7052/api/Provicias";
private totalmiembros = "https://localhost:7052/api/Personas/total";
private urlchart = 'https://localhost:7052/api/Provicias/miembros-por-provincia';
private urlcharts = 'https://localhost:7052/api/Provicias/miembros-por-prov';
private urllistaprovincias = 'https://localhost:7052/api/Personas/Prov';
private urlpersonasporgenero = 'https://localhost:7052/api/Personas/miembros-por-genero';


http = inject(HttpClient);
route = inject(Router);

Charts(): Observable<any>{
  return this.http.get<any>(this.urlchart);
}
GetMiembrosPorGenero(): Observable<CantidadpGenero[]>{
  return this.http.get<CantidadpGenero[]>(this.urlpersonasporgenero);
}
Chart(): Observable<any>{
  return this.http.get<any>(this.urlcharts);
}
GettotalMiembrosPorUsuario(id:number){
  return this.http.get<any>(`${this.urlpersonas}/Totalppu?id=${id}`);
}
GetPPU(id:number): Observable<any>{
  return this.http.get<any>(`${this.urlpersonas}/Selectppu?id=${id}`);
}
TotalMiembros(): Observable<any>{
  return this.http.get<number>(this.totalmiembros);
}
  Filtrarprov(nombre: string): Observable<any[]> {
return this.http.get<any>(`${this.urlpersonas}/Filtrar-por-provincia?name=${nombre}`)
  }
/*Filtrarprov(nombre: string){
return this.http.get<any[]>(`${this.urlprovincias}/filtrar-por-nombre?name=${nombre}`);
}*/
FiltrarPersonas(nombre: string) {
  return this.http.get<any[]>(`${this.urlpersonas}/filter?name=${nombre}`);
}
GetProvincias(): Observable<any>{
  return this.http.get<any>(this.urllistaprovincias);
}
 warning(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: 'warning',
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
  error(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: 'error',
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
  success(title:string, text:string, btncolor:string){
return Swal.fire({
  title: title,
  text: text,
  icon: 'success',
  confirmButtonText:'aceptar',
  confirmButtonColor: btncolor,
});
 }
 confirmruta(title:string,text:string,ruta:string){
return Swal.fire({
  title:title,
  text:text,
  icon: "question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: "red",
}).then(res=> {
  if(res.isConfirmed){
    this.route.navigateByUrl(ruta);
  }
})
 }
 confirmdelete(title:string,text:string,btncolor:string){
return Swal.fire({
  title:title,
  text:text,
  icon:"question",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonColor: btncolor,
}).then((result) =>{
  if(result.isConfirmed){
this.warning("Exito!","Datos borrados existosamente!","green");
  }
})
 }
 getpersona(id: number): Observable<any>{
return this.http.get(`${this.urlpersonas}/${id}`);
 }
 actualizar(id: number, person: any){
  return this.http.put(`${this.urlpersonas}/${id}`,person);
 }
getpersonas(){
 return this.http.get<any>(this.urlpersonas);
}
postpersonas(data: any){
return this.http.post(this.urlpersonas, data);
}
deletepersona(id:number): Observable<any>{
  return this.http.delete(`${this.urlpersonas}/${id}`);
}
SetPersona(id: number): Observable<any>{
return this.http.put(`${this.urlpersonas}/borrado/${id}`,{});
}
}
