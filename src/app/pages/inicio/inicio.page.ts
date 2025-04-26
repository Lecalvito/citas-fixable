import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CitaService, Cita } from '../../services/cita.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './inicio.page.html',
})
export class InicioPage {
  citaAleatoria!: Cita;
  permitirEliminar = true;

  constructor(
    private citaService: CitaService,
    private configService: ConfigService,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.citaAleatoria = this.citaService.obtenerCitaAleatoria();
    this.permitirEliminar = await this.configService.getEliminarDesdeInicio();
  }

  eliminarCita() {
    if (!this.citaAleatoria) return;
    this.citaService.eliminarCita(this.citaAleatoria.frase);
    this.citaAleatoria = this.citaService.obtenerCitaAleatoria();
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  irAGestion() {
    this.router.navigate(['/citas']);
  }
}
