import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ConfigService } from './services/config.service';
import { SQLiteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private configService: ConfigService,
    private sqliteService: SQLiteService
  ) {}

  async ngOnInit() {
    console.log('🌟 AppComponent: ngOnInit iniciado');

    try {
      console.log('🔹 Cargando configuración...');
      await this.configService.cargarConfiguracion();
      console.log('✅ Configuración cargada');

      console.log('🔹 Inicializando base de datos...');
      await this.sqliteService.initDB();
      console.log('✅ Base de datos inicializada');
    } catch (error) {
      console.error('❌ Error inicializando la app:', error);
    }
  }
}
