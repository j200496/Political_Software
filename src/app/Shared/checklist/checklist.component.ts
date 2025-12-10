import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent {
@Input() titulo!:string;
@Input() list!: string;
@Input() datos: any[] = [];
@Input() IdField: string = 'id';
@Input() TextField: string = 'nombre';
@Input() seleccionado: number[] = [];   // IDs seleccionados desde el padre
  @Output() changeSelection = new EventEmitter<number[]>();

  // Mapa para checkboxes
  checkedMap: { [key: number]: boolean } = {};
provseleccionadas: number[] = []
ngOnChanges() {
  this.checkedMap = {};
  this.provseleccionadas = [...this.seleccionado]; // ← sincroniza arrays

  this.seleccionado.forEach(id => {
    this.checkedMap[id] = true;
  });
}

  toggle(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      // Marca
      this.checkedMap[id] = true;
    } else {
      // Desmarca
      delete this.checkedMap[id];
    }

    // Convierte el mapa a una lista de IDs
    const seleccionados = Object.keys(this.checkedMap).map(x => Number(x));

    // Envía al padre
    this.changeSelection.emit(seleccionados);
  }
}
