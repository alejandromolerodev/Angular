package com.sgi.backend.service;

import java.util.List;

public interface IService<T, K> {
    T save(K dto);

    void deleteById(Long id); // Cambiado a void, porque no necesitamos devolver el objeto al eliminarlo

    T update(Long id, K dto);

    K findById(Long id);

    List<K> findAll();

    T convertToEntity(K dto);

    K convertToDto(T entity);
}
