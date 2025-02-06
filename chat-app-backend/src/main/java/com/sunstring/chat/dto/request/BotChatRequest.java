package com.sunstring.chat.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BotChatRequest {
    private String message;
    private String userId;
    private String userName;
    private String botId;
}
