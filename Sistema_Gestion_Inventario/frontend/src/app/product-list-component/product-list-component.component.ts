// Importa los decoradores Component y OnInit de Angular Core
import { Component, OnInit } from "@angular/core";
// Importa la interfaz Product que define la estructura de datos de un producto
import { Product } from "../models/product";
// Importa CommonModule que contiene directivas comunes (ngIf, ngFor, etc.)
import { CommonModule } from "@angular/common";
// Importa RouterModule para poder usar directivas como routerLink
import { RouterModule } from "@angular/router";
// Importa el servicio que maneja las operaciones CRUD con productos
import { ProductServiceService } from "../services/product-service.service";
import { By } from "@angular/platform-browser";

// Decorador que define las características del componente
@Component({
  // Selector CSS para este componente, permite usarlo como <app-product-list-component></app-product-list-component>
  selector: "app-product-list-component",
  // Importa los módulos necesarios para este componente
  imports: [CommonModule, RouterModule],
  // Ruta al archivo HTML que contiene la plantilla del componente
  templateUrl: "./product-list-component.component.html",
  // Ruta al archivo CSS que contiene los estilos del componente
  styleUrls: ["./product-list-component.component.css"],
})
// Define la clase del componente e implementa OnInit para el ciclo de vida
export class ProductListComponentComponent implements OnInit {
  // Inicializa un array vacío para almacenar los productos
  products: Product[] = [];

  // Constructor que inyecta el servicio de productos
  constructor(private productService: ProductServiceService) {}

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Llama al método para cargar los productos cuando el componente se inicia
    this.loadProducts();
  }

  // Método que obtiene todos los productos del servicio
  loadProducts(): void {
    // Llama al método getProducts del servicio y se suscribe al observable
    this.productService.getProducts().subscribe((products) => {
      // Asigna los productos recibidos a la propiedad local
      this.products = products; // Asegúrate de que los datos lleguen aquí
    });
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id: number): void {
    // Llama al método deleteProduct del servicio y se suscribe al observable
    this.productService.deleteProduct(id).subscribe(() => {
      // Después de eliminar correctamente, recarga la lista de productos
      this.loadProducts();
    });
  }
}
