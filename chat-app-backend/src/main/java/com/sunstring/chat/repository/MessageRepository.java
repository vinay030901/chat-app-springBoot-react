package com.sunstring.chat.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sunstring.chat.entity.Message;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

}
