package com.sunstring.chat.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sunstring.chat.dto.MessageRequest;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.entity.Room;
import com.sunstring.chat.exception.RoomNotFoundException;
import com.sunstring.chat.repository.RoomRepository;
import com.sunstring.chat.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

    private RoomRepository roomRepository;

    public ChatServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Message sendMessage(MessageRequest messageRequest) {
        try {
            Optional<Room> optionalRoom = roomRepository.findByRoomId(messageRequest.getRoomId());
            Message message = Message.builder().content(messageRequest.getContent()).sender(messageRequest.getSender())
                    .timeStamp(LocalDateTime.now()).build();
            Room room = optionalRoom.get();
            room.getMessages().add(message);
            roomRepository.save(room);
            return message;
        } catch (RoomNotFoundException e) {
            e.printStackTrace();
            throw new RoomNotFoundException("Room with this id does not exist");
        }
    }

}
