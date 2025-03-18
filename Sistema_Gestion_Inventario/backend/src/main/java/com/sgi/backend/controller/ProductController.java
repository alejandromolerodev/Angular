package com.sgi.backend.controller;

import com.sgi.backend.dto.ProductDTO;
import com.sgi.backend.entity.Product;
import com.sgi.backend.service.IService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private IService<Product, ProductDTO> productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> save(@RequestBody ProductDTO productDTO) {
        Product product = productService.save(productDTO);
        return ResponseEntity.ok(productService.convertToDto(product)); // Convertimos el producto a DTO
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(
        @PathVariable Long id,
        @RequestBody ProductDTO productDTO
    ) {
        Product product = productService.update(id, productDTO);
        return ResponseEntity.ok(productService.convertToDto(product)); // Convertimos el producto a DTO
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
