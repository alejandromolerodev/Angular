import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { Product } from "../models/product";
import { ProductServiceService } from "../services/product-service.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-form",
  standalone: true, // <-- ¡Esta línea es crucial!
  imports: [FormsModule, CommonModule], // Agrega CommonModule
  templateUrl: "./product-form-component.component.html",
  styleUrls: ["./product-form-component.component.css"],
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: "", description: "", price: 0 }; // Producto temporal
  isEdit = false; // Bandera para saber si es edición

  constructor(
    private service: ProductServiceService,
    private route: ActivatedRoute, // Para leer parámetros de URL
    private router: Router, // Para navegar
  ) {}

  ngOnInit(): void {
    console.log("Cargando ProductFormComponent");
    const id = this.route.snapshot.params["id"]; // Obtiene ID de la URL
    if (id) {
      this.isEdit = true;
      // Carga los datos del producto a editar
      this.service.getProduct(+id).subscribe({
        next: (product) => (this.product = product),
        error: (err) => console.error(err),
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      // Actualiza si es edición
      this.service.updateProduct(this.product).subscribe({
        next: () => this.router.navigate(["/"]), // Navega a lista tras éxito
        error: (err) => console.error(err),
      });
    } else {
      // Crea nuevo producto si no es edición
      this.service.createProduct(this.product).subscribe({
        next: () => this.router.navigate(["/"]),
        error: (err) => console.error(err),
      });
    }
  }
}
