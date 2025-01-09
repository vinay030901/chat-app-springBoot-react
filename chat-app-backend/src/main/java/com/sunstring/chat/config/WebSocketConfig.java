package com.sunstring.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // - When a client subscribes to a topic (e.g., /topic/chat), the message broker
        // creates a new topic destination if it doesn't already exist.
        // - When a message is sent to a topic destination (e.g., /topic/chat), the
        // message broker broadcasts the message to all clients subscribed to that
        // topic.
        // - The message broker uses a simple, in-memory storage mechanism to store
        // topic destinations and their corresponding subscriptions.
        registry.enableSimpleBroker("/topic"); // client subscribes to /topic/messages

        // - When a client sends a message to a destination starting with the /app
        // prefix (e.g., /app/chat), the message is routed to the application itself for
        // processing.
        // - The application can then handle the message and respond accordingly.
        // - The /app prefix is used to distinguish application-specific destinations
        // from topic destinations (which start with the /topic prefix).
        registry.setApplicationDestinationPrefixes("/app"); // server subscribes to /app/chat
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // 1.this url is for connect establishment
                .setAllowedOrigins("Http://localhost:3000")
                .withSockJS();
    }
}
