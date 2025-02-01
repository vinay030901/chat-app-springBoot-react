package com.sunstring.chat.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import com.sunstring.chat.dto.request.MessageRequest;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.service.ChatService;

@Controller
public class ChatController {

    private ChatService chatService;

    ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // for sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}") // 2. client sends message to /app/sendMessage/roomId
                                             // 4. message is then sent to app/sendMessage/roomId
    @SendTo("/topic/room/{roomId}") // 3. server sends message to /topic/room/roomId. On this url, message will be
                                    // published to /app/sendMessage/roomId, client subscribe this
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request,
            StompHeaderAccessor accessor) throws Exception {
        try {
            String token = accessor.getFirstNativeHeader("Authorization").substring(7);
            return chatService.sendMessage(request, token);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Invalid token");
        }
    }
}
