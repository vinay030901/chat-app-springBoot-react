package com.sunstring.chat.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "rooms")
public class Room {

    @Id
    private String id;
    private String roomId;
    @Builder.Default
    private List<Message> messages = new ArrayList<>();
}
