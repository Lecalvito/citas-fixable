import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLiteService } from '../../services/sqlite.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class InicioPage {
  citaAleatoria: { frase: string; autor: string } | null = null;
  citas: { frase: string; autor: string }[] = [];
  permitirEliminar = true;

  constructor(
    private router: Router,
    private sqliteService: SQLiteService,
    private configService: ConfigService
  ) {}

  async ngOnInit() {
    try {
      await this.sqliteService.initDB(); 
      await this.cargarCitas(); 
      this.elegirCitaAleatoria();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  async ionViewWillEnter() {
    this.elegirCitaAleatoria();
    this.permitirEliminar = await this.configService.getEliminarDesdeInicio();
  }

  private async cargarCitas() {
    this.citas = await this.sqliteService.obtenerCitas();
  }

  elegirCitaAleatoria() {
    if (this.citas.length > 0) {
      const indice = Math.floor(Math.random() * this.citas.length);
      this.citaAleatoria = this.citas[indice];
    } else {
      this.citaAleatoria = null;
    }
  }

  async eliminarCita() {
    if (this.citaAleatoria) {
      await this.sqliteService.eliminarCita(this.citaAleatoria.frase);
      await this.cargarCitas();
      this.elegirCitaAleatoria();
    }
  }

  irAGestion() {
    this.router.navigate(['/citas']);
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}
