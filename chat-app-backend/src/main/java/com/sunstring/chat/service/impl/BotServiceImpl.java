package com.sunstring.chat.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunstring.chat.config.BotLibreConstant;
import com.sunstring.chat.dto.request.BotChatRequest;
import com.sunstring.chat.dto.response.GetAllBotsResponse;
import com.sunstring.chat.entity.BotChat;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.repository.BotChatRepository;
import com.sunstring.chat.repository.MessageRepository;
import com.sunstring.chat.service.BotService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BotServiceImpl implements BotService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BotServiceImpl.class);
    private static final String GET_BOTS_URL = "https://www.botlibre.com/rest/json/get-bots";
    private static final String CHAT_WITH_BOT_URL = "https://www.botlibre.com/rest/json/chat";

    private final RestTemplate restTemplate;
    private final BotChatRepository botChatRepository;
    private final MessageRepository messageRepository;
    private final ObjectMapper objectMapper;

    public BotServiceImpl(RestTemplate restTemplate, BotChatRepository botChatRepository, ObjectMapper objectMapper,
            MessageRepository messageRepository) {
        this.restTemplate = restTemplate;
        this.botChatRepository = botChatRepository;
        this.objectMapper = objectMapper;
        this.messageRepository = messageRepository;
    }

    @Override
    public GetAllBotsResponse getAllBots() {
        try {
            String url = String.format("%s?user=%s&password=%s", GET_BOTS_URL, BotLibreConstant.USER,
                    BotLibreConstant.PASSWORD);
            String json = "{\"@application\":\"" + BotLibreConstant.APPLICATION + "\"}";
            ResponseEntity<String> responseEntity = sendPostRequestWithRetry(url, json, 3);
            String responseData = responseEntity.getBody().replaceAll("\\@", "");
            return objectMapper.readValue(responseData, GetAllBotsResponse.class);
        } catch (JsonProcessingException e) {
            LOGGER.error("Error parsing JSON response", e);
        }
        return null;
    }

    @Override
    public List<Message> chatWithBot(BotChatRequest botChatRequest) {
        try {
            String url = String.format("%s?user=%s&password=%s", CHAT_WITH_BOT_URL, BotLibreConstant.USER,
                    BotLibreConstant.PASSWORD);
            System.out.println("got bot chat request: " + botChatRequest.toString());
            String json = objectMapper.writeValueAsString(Map.of(
                    "application", BotLibreConstant.APPLICATION,
                    "instance", botChatRequest.getBotId(),
                    "message", botChatRequest.getMessage()));
            ResponseEntity<String> responseEntity = sendPostRequestWithRetry(url, json, 3);
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            String responseMessage = jsonNode.get("message").asText();
            BotChat botChat = getBotChat(botChatRequest);
            return addChat(botChat, botChatRequest, responseMessage);
        } catch (JsonProcessingException e) {
            LOGGER.error("Error parsing JSON response", e);
        }
        return null;
    }

    private ResponseEntity<String> sendPostRequest(String url, String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
        return restTemplate.postForEntity(url, requestEntity, String.class);
    }

    private ResponseEntity<String> sendPostRequestWithRetry(String url, String json, int maxRetries) {
        int retryCount = 0;
        ResponseEntity<String> response = null;

        while (retryCount < maxRetries) {
            try {
                response = sendPostRequest(url, json);
                break;
            } catch (RestClientException e) {
                retryCount++;
                if (retryCount < maxRetries) {
                    // Wait for a short period before retrying
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException ex) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    LOGGER.error("Error communicating with BotLibre API after {} retries", maxRetries, e);
                }
            }
        }

        return response;
    }

    private BotChat getBotChat(BotChatRequest botChatRequest) {
        Optional<BotChat> optionalBotChat = botChatRepository.findByUserIdAndBotId(botChatRequest.getUserId(),
                botChatRequest.getBotId());

        if (optionalBotChat.isPresent())
            return optionalBotChat.get();
        return new BotChat(botChatRequest.getUserId(), botChatRequest.getBotId(), new ArrayList<>());
    }

    private List<Message> addChat(BotChat botChat, BotChatRequest botChatRequest, String responseMessage) {
        Message messageFromSender = new Message(botChatRequest.getUserId(), botChatRequest.getMessage(),
                botChatRequest.getUserName());
        Message messageFromBot = new Message(botChat.getBotId(), responseMessage, "bot");
        messageRepository.save(messageFromSender);
        messageRepository.save(messageFromBot);
        List<Message> listedMessages;
        if (botChat.getMessages() != null && botChat.getMessages().size() > 0)
            listedMessages = botChat.getMessages();
        else
            listedMessages = new ArrayList<>();
        listedMessages.add(messageFromSender);
        listedMessages.add(messageFromBot);
        botChat.setMessages(listedMessages);
        System.out.println("saving bot chat: " + botChat.toString());
        botChatRepository.save(botChat);
        return listedMessages;
    }

    @Override
    public List<Message> loadMessages(String botId, String userId) {
        Optional<BotChat> botChat = botChatRepository.findByUserIdAndBotId(userId, botId);
        if (botChat.isPresent())
            return botChat.get().getMessages();
        return new ArrayList<>();
    }
}
