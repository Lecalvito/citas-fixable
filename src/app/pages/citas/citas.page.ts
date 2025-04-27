import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CitasPage implements OnInit {
  frase = '';
  autor = '';
  citas: { frase: string; autor: string }[] = [];

  constructor(private sqliteService: SQLiteService) {}

  async ngOnInit() {
    await this.cargarCitas();
  }

  async cargarCitas() {
    this.citas = await this.sqliteService.obtenerCitas();
  }

  async agregarCita() {
    if (this.frase.trim().length >= 5 && this.autor.trim().length >= 2) {
      await this.sqliteService.insertarCita(this.frase.trim(), this.autor.trim());
      this.frase = '';
      this.autor = '';
      await this.cargarCitas();
    }
  }

  async eliminarCita(cita: { frase: string; autor: string }) {
    await this.sqliteService.eliminarCita(cita.frase);
    await this.cargarCitas();
  }
}
