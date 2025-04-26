import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SQLiteService } from './services/sqlite.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private sqliteService: SQLiteService) {
    this.inicializarBaseDatos();
  }

  async inicializarBaseDatos() {
    if (Capacitor.getPlatform() !== 'web') {
      await this.sqliteService.initDB();
    }
  }
}