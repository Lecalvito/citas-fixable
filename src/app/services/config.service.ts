import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly KEY = 'permitirEliminar';

  async getEliminarDesdeInicio(): Promise<boolean> {
    if (Capacitor.getPlatform() === 'web') return true;
    const { value } = await Preferences.get({ key: this.KEY });
    return value ? JSON.parse(value) : true;
  }

  async setEliminarDesdeInicio(valor: boolean): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      await Preferences.set({
        key: this.KEY,
        value: JSON.stringify(valor),
      });
    }
  }
}

