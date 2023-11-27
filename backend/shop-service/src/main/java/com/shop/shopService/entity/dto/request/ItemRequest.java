package com.shop.shopService.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest {
    String name;
    String description;
    List<Long> categories = new ArrayList<>();
    String image;
    BigDecimal price;
}
