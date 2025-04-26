import { Injectable } from '@angular/core';

export interface Cita {
  frase: string;
  autor: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private citas: Cita[] = [
    { frase: 'Un hombre sin un plan es como un barco sin rumbo.', autor: 'Doppo Kunikida' },
    { frase: 'La vida de cada ser humano comienza por una tragedia.', autor: 'Osamu Dazai' },
    { frase: 'El misterio es simplemente el arte de mostrar lo que todos ven, pero con ojos que no todos poseen.', autor: 'Ranpo Edogawa' },
    { frase: 'Incluso si el mundo entero cambia, un hombre debe vivir según sus convicciones.', autor: 'Doppo Kunikida' },
    { frase: 'La modernidad ha traído luz, pero ha destruido el misterio.', autor: 'Junichirō Tanizaki' },
  ];

  obtenerCitaAleatoria(): Cita {
    const index = Math.floor(Math.random() * this.citas.length);
    return this.citas[index];
  }

  obtenerTodas(): Cita[] {
    return [...this.citas];
  }

  agregarCita(frase: string, autor: string): void {
    this.citas.push({ frase, autor });
  }

  eliminarCita(frase: string): void {
    this.citas = this.citas.filter(c => c.frase !== frase);
  }
}
