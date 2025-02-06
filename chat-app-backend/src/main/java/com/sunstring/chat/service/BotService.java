package com.sunstring.chat.service;

import java.util.List;

import com.sunstring.chat.dto.request.BotChatRequest;
import com.sunstring.chat.dto.response.GetAllBotsResponse;
import com.sunstring.chat.entity.Message;

public interface BotService {

    GetAllBotsResponse getAllBots();

    List<Message> chatWithBot(BotChatRequest botChatRequest);

    List<Message> loadMessages(String botId, String userId);
}
