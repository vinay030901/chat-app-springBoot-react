package com.sunstring.chat.service;

import org.springframework.stereotype.Component;

import com.sunstring.chat.dto.request.MessageRequest;
import com.sunstring.chat.entity.Message;

@Component
public interface ChatService {
    Message sendMessage(MessageRequest messageRequest, String token);
}
