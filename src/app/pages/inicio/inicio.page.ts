import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SQLiteService } from '../../services/sqlite.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class InicioPage implements OnInit {
  citas: { frase: string; autor: string }[] = [];
  citaAleatoria: { frase: string; autor: string } | null = null;
  permitirEliminar = false;

  constructor(
    private sqliteService: SQLiteService,
    private configService: ConfigService
  ) {}

  async ngOnInit() {
    await this.cargarDatos();
  }

  private async cargarDatos() {
    this.citas = await this.sqliteService.obtenerCitas();
    this.elegirCitaAleatoria();
    this.permitirEliminar = this.configService.getEliminarDesdeInicio();
  }

  elegirCitaAleatoria() {
    if (this.citas.length > 0) {
      const indice = Math.floor(Math.random() * this.citas.length);
      this.citaAleatoria = this.citas[indice];
    }
  }

  async eliminarCita() {
    if (this.citaAleatoria) {
      await this.sqliteService.eliminarCita(this.citaAleatoria.frase);
      this.citas = await this.sqliteService.obtenerCitas();
      this.elegirCitaAleatoria();
    }
  }

  irAGestion() {
    // Navegar a Gestión
  }

  irAConfiguracion() {
    // Navegar a Configuración
  }
}
