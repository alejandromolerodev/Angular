import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

// Inicia la aplicación con la configuración proporcionada
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
