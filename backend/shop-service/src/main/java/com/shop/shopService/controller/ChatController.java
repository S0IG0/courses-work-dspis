package com.shop.shopService.controller;

import com.shop.shopService.auth.annotation.Authenticated;
import com.shop.shopService.entity.models.Message;
import com.shop.shopService.service.MessageService;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ChatController {

    final List<FluxSink<String>> subscribers = new ArrayList<>();
    final MessageService messageService;

    @Autowired
    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @SubscriptionMapping
    Publisher<String> messages() {
        return Flux.create(subscribers::add);
    }

    @Authenticated
    @MutationMapping
    String sendMessage(@Argument String message) {
        messageService.create(Message.builder()
                .text(message)
                .build()
        );
        subscribers.forEach(subscriber -> subscriber.next(message));
        return message;
    }

    @QueryMapping
    List<Message> findAllMessages() {
        return messageService.findAll();
    }
}
