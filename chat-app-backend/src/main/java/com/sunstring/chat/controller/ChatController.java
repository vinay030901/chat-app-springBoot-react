package com.sunstring.chat.controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.sunstring.chat.dto.MessageRequest;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.entity.Room;
import com.sunstring.chat.exception.RoomNotFoundException;
import com.sunstring.chat.service.RoomService;

@Controller
public class ChatController {

    private RoomService roomService;

    public ChatController(RoomService roomService) {
        this.roomService = roomService;
    }

    // for sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}") // client sends message to /app/sendMessage/roomId
    @SendTo("/topic/room/{roomId}") // server sends message to /topic/room/roomId. On this url, message will be
                                    // published to /app/sendMessage/roomId
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {
        try {
            Room room = roomService.getRoom(request.getRoomId());
            Message message = Message.builder().content(request.getContent()).sender(request.getSender())
                    .timeStamp(LocalDateTime.now()).build();
            room.getMessages().add(message);
            return message;
        } catch (RoomNotFoundException e) {
            e.printStackTrace();
            throw new RoomNotFoundException("Room with this id does not exist");
        }

    }
}
