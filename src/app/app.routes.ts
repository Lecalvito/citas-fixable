import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.page';
import { CitasPage } from './pages/citas/citas.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioPage
  },
  {
    path: 'citas',
    component: CitasPage
  },
  {
    path: 'configuracion',
    component: ConfiguracionPage
  }
];
