import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') return;

    this.db = await this.sqlite.createConnection('citasdb', false, 'no-encryption', 1, false);
    await this.db.open();
    const create = ` CREATE TABLE IF NOT EXISTS citas (id INTEGER PRIMARY KEY AUTOINCREMENT, frase TEXT NOT NULL, autor TEXT NOT NULL);`;
    await this.db.execute(create);
  }

  async insertarCita(frase: string, autor: string): Promise<void> {
    if (!this.db) return;
    await this.db.run('INSERT INTO citas (frase, autor) VALUES (?, ?)', [frase, autor]);
  }

  async obtenerCitas(): Promise<{ frase: string; autor: string }[]> {
    if (!this.db) return [];
    const result = await this.db.query('SELECT frase, autor FROM citas');
    return result.values ?? [];
  }

  async eliminarCita(frase: string): Promise<void> {
    if (!this.db) return;
    await this.db.run('DELETE FROM citas WHERE frase = ?', [frase]);
  }
}
