import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CitaService, Cita } from '../../services/cita.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage {
  nuevaCita: Cita = {
    frase: '',
    autor: ''
  };

  citas: Cita[] = [];
  constructor(private citaService: CitaService) {}

  ionViewWillEnter() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citas = this.citaService.obtenerTodas();
  }

  agregarCita() {
    if (this.nuevaCita.frase.trim() && this.nuevaCita.autor.trim()) {
      this.citaService.agregarCita(this.nuevaCita.frase, this.nuevaCita.autor);
      this.nuevaCita = { frase: '', autor: '' };
      this.cargarCitas();
    }
  }

  eliminarCita(frase: string) {
    this.citaService.eliminarCita(frase);
    this.cargarCitas();
  }
}
