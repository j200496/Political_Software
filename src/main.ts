import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,   // <--- IMPORTANTE: Carga las rutas
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    )
  ]
});

