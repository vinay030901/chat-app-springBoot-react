package com.sunstring.chat.dto.response;

import java.util.List;

import com.sunstring.chat.entity.Bot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetAllBotsResponse {
    private List<Bot> bots;
}
