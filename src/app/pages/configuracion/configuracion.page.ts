import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { OpcionesComponent } from '../../components/opciones/opciones.component';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, IonicModule, OpcionesComponent],
  templateUrl: './configuracion.page.html',
})
export class ConfiguracionPage {
  permitirEliminar = false;

  constructor(private configService: ConfigService) {}

  async ionViewWillEnter() {
    this.permitirEliminar = await this.configService.getEliminarDesdeInicio();
  }

  async onCambio(valor: boolean) {
    this.permitirEliminar = valor;
    await this.configService.setEliminarDesdeInicio(valor);
  }
}
