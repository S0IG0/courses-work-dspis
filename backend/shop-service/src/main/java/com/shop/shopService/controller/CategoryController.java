package com.shop.shopService.controller;

import com.shop.shopService.auth.annotation.Authenticated;
import com.shop.shopService.entity.models.Category;
import com.shop.shopService.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CategoryController {
    final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @QueryMapping
    List<Category> findAllCategories() {
        return categoryService.findAll();
    }

    @Authenticated
    @MutationMapping
    Category createCategory(@Argument String name) {
        return categoryService.create(
                Category.builder()
                        .name(name)
                        .build()
        );
    }

    @Authenticated
    @MutationMapping
    Category updateCategory(@Argument Long id, @Argument String name) {
        return categoryService.update(
                id,
                Category.builder()
                        .name(name)
                        .build()
        );
    }

    @MutationMapping
    String deleteCategory(@Argument Long id) {
        categoryService.deleteById(id);
        return "delete category " + id;
    }
}
