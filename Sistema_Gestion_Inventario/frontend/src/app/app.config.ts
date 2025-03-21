import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser"; // <-- ¡Corrección aquí!

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(), // <-- Reemplaza importProvidersFrom(BrowserModule)
  ],
};
