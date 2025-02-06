package com.sunstring.chat.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("instance")
    private List<Bot> bots;
}
