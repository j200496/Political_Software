import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Province } from '../components/provincias/Core/Province';
import { AsignarProvDto } from '../components/provincias/Core/AsignarProvDto';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  http = inject(HttpClient);
  //private url1prov = "https://localhost:7052/api/Provicias/listar";
  private urlpostprov = "https://localhost:7052/api/Provicias";

GetProvincia(){
  return this.http.get<any>(this.urlpostprov);
}
GetProvpu(id:number){
return this.http.get<any>(`${this.urlpostprov}/Getpropu?id=${id}`);
}
PostProvincia(p: Province){
return this.http.post(this.urlpostprov,p)
}
Deleteprov(id:number){
return this.http.put(`${this.urlpostprov}?id=${id}`,{});
}
GetunaProv(id:number){
return this.http.get<any>(`${this.urlpostprov}/${id}`)
}
AsignarProv( p:AsignarProvDto){
  return this.http.post(`${this.urlpostprov}/asignar-provincias`, p);
}
GetProvinciasAsignadas(idUsuario: number) {
  return this.http.get<number[]>(`${this.urlpostprov}/Lista-prov/${idUsuario}`);
}

}
