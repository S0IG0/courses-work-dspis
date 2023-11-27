package com.shop.shopService.service.impl;

import com.shop.shopService.entity.models.Item;
import com.shop.shopService.repository.ItemRepository;
import com.shop.shopService.service.ItemService;
import com.shop.shopService.service.base.impl.BaseCRUDServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl extends BaseCRUDServiceImpl<Item, Long> implements ItemService {
    final ItemRepository repository;

    @Autowired
    public ItemServiceImpl(ItemRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public Item create(Item item) {
        Long id = repository.saveAndFlush(item).getId();
        repository.clear();
        return findById(id);
    }
}
