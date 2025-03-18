package com.sgi.backend.service;

import com.sgi.backend.dto.ProductDTO;
import com.sgi.backend.entity.Product;
import com.sgi.backend.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService_Impl implements IService<Product, ProductDTO> {

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
    public Product update(Long id, ProductDTO productDTO) {
        Product product = productRepository
            .findById(id)
            .orElseThrow(() ->
                new EntityNotFoundException("Product not found with id: " + id)
            );

        // Mapea los campos del DTO a la entidad existente
        modelMapper.map(productDTO, product);
        return productRepository.save(product);
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
