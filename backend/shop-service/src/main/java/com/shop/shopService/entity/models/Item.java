package com.shop.shopService.entity.models;

import com.shop.shopService.entity.models.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Item extends BaseEntity<Long> {
    String name;
    @Column(columnDefinition = "text")
    String description;
    @ManyToMany
    List<Category> categories;
    String image;
    BigDecimal price;
}
