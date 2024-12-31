package com.sunstring.chat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RoomAlreadyExistsException extends RuntimeException {

    public RoomAlreadyExistsException(String message) {
        super(message);
    }

    public RoomAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
