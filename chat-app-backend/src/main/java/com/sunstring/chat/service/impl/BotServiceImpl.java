package com.sunstring.chat.service.impl;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.sunstring.chat.config.BotLibreConstant;
import com.sunstring.chat.entity.Bot;
import com.sunstring.chat.service.BotService;

@Service
public class BotServiceImpl implements BotService {

    private static final String ID_ATTRIBUTE = "id";
    private static final String NAME_ATTRIBUTE = "name";
    private static final String ALIAS_ATTRIBUTE = "alias";
    private static final String AVATAR_ELEMENT = "avatar";
    private static final String DESCRIPTION_ELEMENT = "description";
    private static final String TAGS_ELEMENT = "tags";

    private RestTemplate restTemplate;

    public BotServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Bot> getAllBots() {
        try {
            String url = String.format("https://www.botlibre.com/rest/api/get-bots?user=%s&password=%s",
                    BotLibreConstant.USER, BotLibreConstant.PASSWORD);
            String xmlData = String.format("<browse application='%s'></browse>", BotLibreConstant.APPLICATION);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_XML);

            HttpEntity<String> requestEntity = new HttpEntity<>(xmlData, headers);

            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

            return parseXmlResponse(responseEntity.getBody());
        } catch (Exception e) {
            // Handle exception
            return Collections.emptyList();
        }
    }

    private List<Bot> parseXmlResponse(String xmlResponse)
            throws ParserConfigurationException, SAXException, IOException {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();

        InputSource is = new InputSource(new StringReader(xmlResponse));
        Document doc = builder.parse(is);

        NodeList instances = doc.getElementsByTagName("instance");
        List<Bot> bots = new ArrayList<>();

        for (int i = 0; i < instances.getLength(); i++) {
            Node instance = instances.item(i);
            Bot botInstance = new Bot();

            NamedNodeMap attributes = instance.getAttributes();
            for (int j = 0; j < attributes.getLength(); j++) {
                Node attribute = attributes.item(j);
                switch (attribute.getNodeName()) {
                    case ID_ATTRIBUTE:
                        botInstance.setId(attribute.getNodeValue());
                        break;
                    case NAME_ATTRIBUTE:
                        botInstance.setName(attribute.getNodeValue());
                        break;
                    case ALIAS_ATTRIBUTE:
                        botInstance.setAlias(attribute.getNodeValue());
                        break;
                }
            }

            NodeList childNodes = instance.getChildNodes();
            for (int j = 0; j < childNodes.getLength(); j++) {
                Node childNode = childNodes.item(j);
                if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                    switch (childNode.getNodeName()) {
                        case AVATAR_ELEMENT:
                            botInstance.setAvatar(childNode.getTextContent());
                            break;
                        case DESCRIPTION_ELEMENT:
                            botInstance.setDescription(childNode.getTextContent());
                            break;
                        case TAGS_ELEMENT:
                            botInstance.setTags(childNode.getTextContent());
                            break;
                    }
                }
            }

            bots.add(botInstance);
        }

        return bots;
    }
}
