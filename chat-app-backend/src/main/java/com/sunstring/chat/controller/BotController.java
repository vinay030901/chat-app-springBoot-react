package com.sunstring.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunstring.chat.dto.request.BotChatRequest;
import com.sunstring.chat.entity.Bot;
import com.sunstring.chat.entity.Message;
import com.sunstring.chat.service.BotService;

@RestController
@RequestMapping("/api/v1/bots")
public class BotController {

    private final BotService botService;

    BotController(BotService botService) {
        this.botService = botService;
    }

    @GetMapping("/getAllBots")
    public ResponseEntity<List<Bot>> getAllBots() {
        try {
            System.out.println("Got request to get all bots");
            return new ResponseEntity<>(botService.getAllBots().getBots(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<List<Message>> chatWithBot(@RequestBody BotChatRequest botChatRequest) {
        try {
            System.out.println("Got request to chat with bot");
            return new ResponseEntity<>(botService.chatWithBot(botChatRequest), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/loadMessages")
    public ResponseEntity<List<Message>> loadMessages(@RequestParam String botId, @RequestParam String userId) {
        try {
            System.out.println("Got request to load messages");
            return new ResponseEntity<>(botService.loadMessages(botId, userId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
