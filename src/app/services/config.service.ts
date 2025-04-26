import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private permitirEliminar = true;

  async cargarConfiguracion(): Promise<void> {
    const { value } = await Preferences.get({ key: 'permitirEliminar' });
    if (value !== null) {
      this.permitirEliminar = value === 'true';
    }
  }

  getEliminarDesdeInicio(): boolean {
    return this.permitirEliminar;
  }

  async setEliminarDesdeInicio(valor: boolean): Promise<void> {
    this.permitirEliminar = valor;
    await Preferences.set({ key: 'permitirEliminar', value: String(valor) });
  }
}
