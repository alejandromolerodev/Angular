package com.sgi.backend.service;

import com.sgi.backend.dto.ProductDTO;
import com.sgi.backend.entity.Product;
import com.sgi.backend.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService_Impl implements IService<Product, ProductDTO> {

    // Asumiendo que tienes un repositorio para productos
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Product save(ProductDTO dto) {
        Product entity = convertToEntity(dto);
        return productRepository.save(entity);
    }

    @Override
    public Product update(Product entity) {
        return productRepository.save(entity);
    }

    @Override
    public Product delete(Product entity) {
        productRepository.delete(entity);
        return entity;
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO findById(Long id) {
        ProductDTO prodDto = productRepository
            .findById(id)
            .map(this::convertToDto)
            .orElseThrow(() ->
                new RuntimeException("Product not found with id: " + id)
            );
        return prodDto;
    }

    @Override
    public List<ProductDTO> findAll() {
        return productRepository
            .findAll()
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Override
    public Product convertToEntity(ProductDTO dto) {
        return modelMapper.map(dto, Product.class);
    }

    @Override
    public ProductDTO convertToDto(Product entity) {
        return modelMapper.map(entity, ProductDTO.class);
    }
}
