package com.sunstring.chat.service;

import java.util.List;

import com.sunstring.chat.entity.Message;
import com.sunstring.chat.entity.Room;

public interface RoomService {

    // create room
    Room createRoom(String roomId);

    // get room
    Room getRoom(String roomId);

    // get messages of room
    List<Message> getMessages(String roomId, int page, int size);
}
