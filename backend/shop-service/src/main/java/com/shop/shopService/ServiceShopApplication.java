package com.shop.shopService;

import com.shop.shopService.repository.repository.impl.CustomRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(repositoryBaseClass = CustomRepositoryImpl.class)
public class ServiceShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceShopApplication.class, args);
    }

}
