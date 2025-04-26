import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { IonicModule } from '@ionic/angular';

// 🔥 AQUÍ FORZAMOS MATERIAL DESIGN (md) PARA TODO
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot({ mode: 'md' })), // 👈🏻 ESTA LÍNEA
    provideRouter(routes),
  ],
}).catch(err => console.error(err));
