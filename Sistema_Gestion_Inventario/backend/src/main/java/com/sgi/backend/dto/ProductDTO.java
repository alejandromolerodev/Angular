package com.sgi.backend.dto;

public record ProductDTO(
    Long id,
    String name,
    String description,
    double price
) {}
