// Importa los decoradores y interfaces necesarias para crear un componente Angular
import { Component, OnInit } from "@angular/core";
// Importa clases para manejar la navegación y obtener parámetros de la URL
import { ActivatedRoute, RouterModule } from "@angular/router";
// Importa el servicio Router para navegar programáticamente entre rutas
import { Router } from "@angular/router";
// Importa la interfaz Product que define la estructura de datos de un producto
import { Product } from "../models/product";
// Importa el servicio que maneja las operaciones CRUD con productos
import { ProductServiceService } from "../services/product-service.service";
// Importa FormsModule para usar formularios con ngModel (two-way binding)
import { FormsModule } from "@angular/forms";
// Importa CommonModule que contiene directivas comunes (ngIf, ngFor, etc.)
import { CommonModule } from "@angular/common";

// Decorador que define las características del componente
@Component({
  // Selector CSS para este componente, permite usarlo como <app-product-form></app-product-form>
  selector: "app-product-form",
  // Indica que este componente es independiente y no requiere ser declarado en un NgModule
  standalone: true, // <-- ¡Esta línea es crucial!
  // Importa los módulos necesarios para este componente standalone
  imports: [FormsModule, CommonModule], // Agrega CommonModule para usar directivas
  // Ruta al archivo HTML que contiene la plantilla del componente
  templateUrl: "./product-form-component.component.html",
  // Ruta al archivo CSS que contiene los estilos del componente
  styleUrls: ["./product-form-component.component.css"],
})
// Define la clase del componente e implementa OnInit para el ciclo de vida
export class ProductFormComponent implements OnInit {
  // Inicializa un objeto producto vacío con valores predeterminados
  product: Product = { name: "", description: "", price: 0 }; // Producto temporal
  // Bandera para identificar si el formulario se usa para editar o crear
  isEdit = false; // Bandera para saber si es edición

  // Constructor que inyecta los servicios necesarios
  constructor(
    // Inyecta el servicio para operaciones CRUD de productos
    private service: ProductServiceService,
    // Inyecta ActivatedRoute para acceder a los parámetros de la URL actual
    private route: ActivatedRoute, // Para leer parámetros de URL
    // Inyecta Router para navegar programáticamente
    private router: Router, // Para navegar
  ) {}

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Registra un mensaje en la consola para depuración
    console.log("Cargando ProductFormComponent");
    // Obtiene el parámetro 'id' de la URL actual
    const id = this.route.snapshot.params["id"]; // Obtiene ID de la URL
    // Verifica si hay un ID en la URL (modo edición)
    if (id) {
      // Marca el formulario como modo edición
      this.isEdit = true;
      // Llama al servicio para obtener los datos del producto a editar
      this.service.getProduct(+id).subscribe({
        // En caso de éxito, asigna los datos del producto obtenido al formulario
        next: (product) => (this.product = product),
        // En caso de error, registra el error en la consola
        error: (err) => console.error(err),
      });
    }
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    // Verifica si estamos en modo edición
    if (this.isEdit) {
      // Si es edición, llama al servicio para actualizar el producto
      this.service.updateProduct(this.product).subscribe({
        // En caso de éxito, navega a la página principal
        next: () => this.router.navigate(["/"]), // Navega a lista tras éxito
        // En caso de error, registra el error en la consola
        error: (err) => console.error(err),
      });
    } else {
      // Si no es edición, llama al servicio para crear un nuevo producto
      this.service.createProduct(this.product).subscribe({
        // En caso de éxito, navega a la página principal
        next: () => this.router.navigate(["/"]),
        // En caso de error, registra el error en la consola
        error: (err) => console.error(err),
      });
    }
  }
}
