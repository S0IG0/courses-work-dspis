package com.shop.shopService.service.base;

import java.util.List;

public interface BaseCRUDService<T, ID> {
    T findById(ID id);

    List<T> findAll();

    T create(T item);

    T update(ID id, T item);

    void deleteById(ID id);

}
