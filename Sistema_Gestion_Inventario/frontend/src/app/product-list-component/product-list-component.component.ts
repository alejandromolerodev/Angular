import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductServiceService } from "../services/product-service.service";

@Component({
  selector: "app-product-list-component",
  standalone: true, // <-- Asegúrate de que esta propiedad esté presente
  imports: [CommonModule, RouterModule],
  templateUrl: "./product-list-component.component.html",
  styleUrls: ["./product-list-component.component.css"],
})
export class ProductListComponentComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products; // Asegúrate de que los datos lleguen aquí
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
