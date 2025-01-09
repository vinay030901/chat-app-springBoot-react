package com.sunstring.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunstring.chat.entity.Message;
import com.sunstring.chat.exception.RoomAlreadyExistsException;
import com.sunstring.chat.exception.RoomNotFoundException;
import com.sunstring.chat.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final RoomService roomService;

    // create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        try {
            return new ResponseEntity<>(roomService.createRoom(roomId), HttpStatus.CREATED);
        } catch (RoomAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Room with this id already exists");
        }
    }

    // get room: join room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable String roomId) {
        try {
            return new ResponseEntity<>(roomService.getRoom(roomId), HttpStatus.OK);
        } catch (RoomNotFoundException e) {
            return ResponseEntity.badRequest().body("Room with this id does not exist");
        }
    }

    // get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size) {
        try {
            return new ResponseEntity<>(roomService.getMessages(roomId, page, size), HttpStatus.OK);
        } catch (RoomNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
