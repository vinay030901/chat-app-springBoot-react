package com.sunstring.chat.entity;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@XmlRootElement(name = "instance")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bot {

    @XmlAttribute(name = "id")
    private String id;

    @XmlAttribute(name = "name")
    private String name;

    @XmlAttribute(name = "alias")
    private String alias;

    @XmlElement(name = "avatar")
    private String avatar;

    @XmlElement(name = "description")
    private String description;

    @XmlElement(name = "tags")
    private String tags;
    // getters and setters
}
