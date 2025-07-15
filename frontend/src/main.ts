import { routeConfig } from './app/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routeConfig),
    // TODO: Agregar tus providers aquí (interceptors, servicios, etc.)
  ],
}).catch((err) => console.error(err));