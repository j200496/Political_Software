import { Component, inject } from '@angular/core';
import { FormComponent } from "../../Shared/form/form.component";
import { PersonasService } from '../../services/personas.service';
import { FooterComponent } from '../../Shared/footer/footer.component';


@Component({
  selector: 'app-home',
  imports: [FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
service = inject(PersonasService)

guardar(person:any){
this.service.postpersonas(person).subscribe(()=>{
this.service.warning("Exito","Datos guardados exitosamente","green");
})
}
}
