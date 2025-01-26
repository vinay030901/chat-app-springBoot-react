package com.sunstring.chat.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sunstring.chat.config.JwtTokenValidator;
import com.sunstring.chat.dto.request.MessageRequest;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.entity.Room;
import com.sunstring.chat.entity.User;
import com.sunstring.chat.exception.RoomNotFoundException;
import com.sunstring.chat.repository.RoomRepository;
import com.sunstring.chat.repository.UserRepository;
import com.sunstring.chat.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

    private RoomRepository roomRepository;
    private UserRepository userRepository;

    public ChatServiceImpl(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Message sendMessage(MessageRequest messageRequest, String token) {
        try {
            String senderEmail = JwtTokenValidator.getUsernameFromToken(token);
            Optional<User> senderUser = userRepository.findByEmail(senderEmail);
            Optional<Room> optionalRoom = roomRepository.findByRoomId(messageRequest.getRoomId());
            Message message = Message.builder().content(messageRequest.getContent())
                    .senderId(senderUser.get().getUserId())
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
