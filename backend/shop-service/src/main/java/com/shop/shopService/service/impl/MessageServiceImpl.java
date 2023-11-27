package com.shop.shopService.service.impl;

import com.shop.shopService.entity.models.Message;
import com.shop.shopService.repository.MessageRepository;
import com.shop.shopService.service.MessageService;
import com.shop.shopService.service.base.impl.BaseCRUDServiceImpl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl extends BaseCRUDServiceImpl<Message, Long> implements MessageService {
    public MessageServiceImpl(MessageRepository repository) {
        super(repository);
    }
}
