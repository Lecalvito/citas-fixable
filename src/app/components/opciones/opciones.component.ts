import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './opciones.component.html',
})
export class OpcionesComponent {
  @Input() permitirEliminar = false;
  @Output() cambio = new EventEmitter<boolean>();

  onToggle(event: CustomEvent) {
    this.cambio.emit(event.detail.checked);
  }
}
