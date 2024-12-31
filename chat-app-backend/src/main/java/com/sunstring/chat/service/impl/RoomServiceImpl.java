package com.sunstring.chat.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sunstring.chat.entity.Message;
import com.sunstring.chat.entity.Room;
import com.sunstring.chat.exception.RoomAlreadyExistsException;
import com.sunstring.chat.exception.RoomNotFoundException;
import com.sunstring.chat.repository.RoomRepository;
import com.sunstring.chat.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    Logger logger = LoggerFactory.getLogger(RoomServiceImpl.class);

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room createRoom(String roomId) throws RoomAlreadyExistsException {
        Optional<Room> optionalRoom = roomRepository.findByRoomId(roomId);
        if (optionalRoom.isPresent()) {
            logger.info("Room already exists with id: " + optionalRoom.get().getId());
            throw new RoomAlreadyExistsException(roomId + " already exists");
        }
        Room room = new Room();
        room.setRoomId(roomId);
        return roomRepository.save(room);
    }

    @Override
    public Room getRoom(String roomId) throws RoomNotFoundException {
        Optional<Room> roomOptional = roomRepository.findByRoomId(roomId);
        if (roomOptional.isPresent()) {
            logger.info("Room found with id " + roomOptional.get().getRoomId());
            return roomOptional.get();
        }

        throw new RoomNotFoundException(roomId + " not found");
    }

    @Override
    public List<Message> getMessages(String roomId, int page, int size) {
        Optional<Room> roomOptional = roomRepository.findByRoomId(roomId);
        if (!roomOptional.isPresent()) {
            throw new RoomNotFoundException(roomId + " not found");
        }
        List<Message> messages = roomOptional.get().getMessages();
        int fromIndex = Math.max(0, Math.min(messages.size(), page * size)); // messages.size()-(page+1)*size
        int toIndex = Math.max(0, Math.min(messages.size(), (page + 1) * size)); // fromIndex+size
        return messages.subList(fromIndex, toIndex);
    }

}
