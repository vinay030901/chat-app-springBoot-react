package com.sunstring.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunstring.chat.entity.Bot;
import com.sunstring.chat.service.BotService;

@RestController("/api/v1/bots")
public class BotController {

    private final BotService botService;

    BotController(BotService botService) {
        this.botService = botService;
    }

    @GetMapping("/getAllBots")
    public ResponseEntity<List<Bot>> getAllBots() {
        try {
            return new ResponseEntity<>(botService.getAllBots(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
