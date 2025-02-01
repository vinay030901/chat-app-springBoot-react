package com.sunstring.chat.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.sunstring.chat.entity.Room;

public interface RoomRepository extends MongoRepository<Room, String> {

    // get room by roomId
    @Query("{'roomId': ?0}")
    Optional<Room> findByRoomId(String roomId);

}
