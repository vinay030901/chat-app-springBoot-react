package com.sunstring.chat.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sunstring.chat.entity.BotChat;

@Repository
public interface BotChatRepository extends MongoRepository<BotChat, String> {
    // get bot chat by botId
    Optional<BotChat> findByUserIdAndBotId(String userId, String botId);

}
