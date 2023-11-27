package com.shop.shopService.controller;

import com.shop.shopService.auth.annotation.Authenticated;
import com.shop.shopService.entity.dto.request.ItemRequest;
import com.shop.shopService.entity.models.Category;
import com.shop.shopService.entity.models.Item;
import com.shop.shopService.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ItemController {
    final ItemService itemService;
    final ModelMapper mapper;

    @Autowired
    public ItemController(ItemService itemService, ModelMapper mapper) {
        this.itemService = itemService;
        this.mapper = mapper;
    }

    @QueryMapping
    List<Item> findAllItems() {
        return itemService.findAll();
    }

    @Authenticated
    @MutationMapping
    Item createItem(@Argument ItemRequest item) {

        Item temp = mapper.map(item, Item.class);
        temp.setCategories(
                item
                        .getCategories()
                        .stream()
                        .map(id -> Category.builder()
                                .id(id)
                                .build()
                        ).collect(Collectors.toList())
        );

        return itemService.create(temp);
    }

    @Authenticated
    @MutationMapping
    Item updateItem(@Argument Long id, @Argument ItemRequest item) {
        Item temp = mapper.map(item, Item.class);
        temp.setCategories(
                item
                        .getCategories()
                        .stream()
                        .map(idCategory -> Category.builder()
                                .id(idCategory)
                                .build()
                        ).collect(Collectors.toList())
        );

        return itemService.update(id, temp);
    }
}
