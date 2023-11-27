package com.shop.shopService.entity.models;

import com.shop.shopService.entity.models.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Message extends BaseEntity<Long> {
    @Column(columnDefinition = "text")
    String text;
}
