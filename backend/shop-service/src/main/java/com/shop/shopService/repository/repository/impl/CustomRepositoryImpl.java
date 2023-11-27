package com.shop.shopService.repository.repository.impl;

import com.shop.shopService.repository.repository.CustomRepository;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.support.JpaMetamodelEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

public class CustomRepositoryImpl
        <T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID>
        implements CustomRepository<T, ID> {

    private final EntityManager entityManager;

    public CustomRepositoryImpl(JpaMetamodelEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void refresh(T t) {
        entityManager.refresh(t);
    }

    @Override
    @Transactional
    public void clear() {
        entityManager.clear();
    }
}