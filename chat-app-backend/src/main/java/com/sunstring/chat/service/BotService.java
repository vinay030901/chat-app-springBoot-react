package com.sunstring.chat.service;

import java.io.IOException;
import java.util.List;

import javax.xml.bind.JAXBException;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import com.sunstring.chat.entity.Bot;

public interface BotService {

    List<Bot> getAllBots() throws JAXBException, ParserConfigurationException, SAXException, IOException;
}
