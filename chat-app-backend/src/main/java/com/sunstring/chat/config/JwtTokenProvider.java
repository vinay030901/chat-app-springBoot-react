package com.sunstring.chat.config;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.sunstring.chat.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider {

    public static String generateJwtToken(User user) {
        // Implement JWT token generation using a library like JJWT
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("username", user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 86400000)) // 24 hours
                .signWith(Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }
}
