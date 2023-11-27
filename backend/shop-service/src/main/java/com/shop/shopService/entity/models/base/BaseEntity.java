package com.shop.shopService.entity.models.base;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity<ID extends Serializable> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected ID id;
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    protected LocalDateTime created;
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    protected LocalDateTime updated;
}