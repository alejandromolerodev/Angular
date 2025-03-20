import { Routes } from "@angular/router";
import { ProductListComponentComponent } from "./product-list-component/product-list-component.component";
import { ProductFormComponent } from "./product-form-component/product-form-component.component";

export const routes: Routes = [
  { path: "", component: ProductListComponentComponent }, // Ruta principal
  { path: "add", component: ProductFormComponent }, // Crear producto
  { path: "edit/:id", component: ProductFormComponent }, // Editar producto
];
