package com.shop.shopService.service.impl;

import com.shop.shopService.entity.models.Category;
import com.shop.shopService.repository.CategoryRepository;
import com.shop.shopService.service.CategoryService;
import com.shop.shopService.service.base.impl.BaseCRUDServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends BaseCRUDServiceImpl<Category, Long> implements CategoryService {
    @Autowired
    public CategoryServiceImpl(CategoryRepository repository) {
        super(repository);
    }
}
