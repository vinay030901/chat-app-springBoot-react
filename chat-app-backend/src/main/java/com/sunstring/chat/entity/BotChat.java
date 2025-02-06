package com.sunstring.chat.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "botChat")
public class BotChat {
    @Id
    private String botChatId;
    private String userId;
    private String botId;
    @DBRef
    private List<Message> messages;

    public BotChat(String userId, String botId, List<Message> messages) {

        this.botId = botId;
        this.userId = userId;
        this.messages = messages;
    }

}
