// Importa el tipo Routes de Angular Router que define la estructura de las rutas
import { Routes } from "@angular/router";
// Importa el componente de lista de productos que se usará en la ruta principal
import { ProductListComponentComponent } from "./product-list-component/product-list-component.component";
// Importa el componente de formulario de productos que se usará para crear y editar productos
import { ProductFormComponent } from "./product-form-component/product-form-component.component";

// Define las rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz que carga el componente de lista de productos
  { path: "", component: ProductListComponentComponent }, // Ruta principal

  // Ruta para crear un nuevo producto que carga el componente de formulario
  { path: "add", component: ProductFormComponent }, // Crear producto

  // Ruta para editar un producto existente que incluye un parámetro 'id'
  // El ':id' es un parámetro dinámico que será reemplazado por el ID real del producto
  { path: "edit/:id", component: ProductFormComponent }, // Editar producto
];
