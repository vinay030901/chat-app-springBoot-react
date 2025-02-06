package com.sunstring.chat.entity;

import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "refresh_tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("refresh_token")
    private String refreshToken;

    @Field("created_at")
    private Date createdAt;

    @Field("expires_at")
    private Date expiresAt;
}
