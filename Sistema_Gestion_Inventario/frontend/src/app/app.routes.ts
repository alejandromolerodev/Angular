import { Routes } from "@angular/router";
import { ProductListComponentComponent } from "./product-list-component/product-list-component.component";
import { ProductFormComponentComponent } from "./product-form-component/product-form-component.component";

export const routes: Routes = [
  { path: "", component: ProductListComponentComponent }, // Ruta principal
  { path: "add", component: ProductFormComponentComponent }, // Crear producto
  { path: "edit/:id", component: ProductFormComponentComponent }, // Editar producto
];
