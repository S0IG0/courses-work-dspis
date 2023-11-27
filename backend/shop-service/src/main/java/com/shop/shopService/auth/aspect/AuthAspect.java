package com.shop.shopService.auth.aspect;

import com.shop.shopService.auth.dto.TokenRequest;
import com.shop.shopService.exception.NotAuthenticate;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Aspect
@Component
public class AuthAspect {
    @Value("${auth.host}")
    String authHost;

    final HttpServletRequest httpServletRequest;

    @Autowired
    public AuthAspect(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }

    @Before("@annotation(com.shop.shopService.auth.annotation.Authenticated)")
    public void authenticate() {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null) {
            throw new NotAuthenticate("Header Authorization is null");
        }

        try {
            ResponseEntity<?> response = makeRequest(token);
            if (!response.getStatusCode().equals(HttpStatus.OK)) {
                throw new NotAuthenticate(Objects.requireNonNull(response.getBody()).toString());
            }
        } catch (HttpClientErrorException exception) {
            throw new NotAuthenticate(exception.getMessage());
        }
    }

    private @NotNull ResponseEntity<Object> makeRequest(String token) {
        return new RestTemplate().exchange(
                "http://" + authHost + "/api/token/verify/",
                HttpMethod.POST,
                new HttpEntity<>(new TokenRequest(token)),
                Object.class
        );
    }
}