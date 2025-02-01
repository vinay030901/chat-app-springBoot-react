package com.sunstring.chat.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {

    @Id
    private String messageId;
    private String senderId;
    private String sender;
    private String content;
    private LocalDateTime timeStamp;

    Message(String senderId, String content, String sender) {
        this.messageId = null; // For MongoDB auto-generated ID
        this.senderId = senderId;
        this.sender = sender;
        this.content = content;
        this.timeStamp = LocalDateTime.now();
    }
}
