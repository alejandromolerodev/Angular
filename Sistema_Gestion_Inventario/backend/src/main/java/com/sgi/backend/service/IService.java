package com.sgi.backend.service;

import java.util.List;

public interface IService<T, K> {
    T save(K dto);

    T update(T entity);

    T delete(T entity);

    void deleteById(Long id);

    K findById(Long id);

    List<K> findAll();

    T convertToEntity(K dto);

    K convertToDto(T entity);
}
