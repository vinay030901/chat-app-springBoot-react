package com.sunstring.chat.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bot {
    @JsonProperty("size")
    private String size;

    @JsonProperty("allowForking")
    private boolean allowForking;

    @JsonProperty("isArchived")
    private boolean isArchived;

    @JsonProperty("hasAPI")
    private boolean hasAPI;

    @JsonProperty("wins")
    private int wins;

    @JsonProperty("losses")
    private int losses;

    @JsonProperty("rank")
    private int rank;

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("alias")
    private String alias;

    @JsonProperty("isAdult")
    private boolean isAdult;

    @JsonProperty("isPrivate")
    private boolean isPrivate;

    @JsonProperty("isHidden")
    private boolean isHidden;

    @JsonProperty("accessMode")
    private String accessMode;

    @JsonProperty("forkAccessMode")
    private String forkAccessMode;

    @JsonProperty("contentRating")
    private String contentRating;

    @JsonProperty("isFlagged")
    private boolean isFlagged;

    @JsonProperty("isReviewed")
    private boolean isReviewed;

    @JsonProperty("isFeatured")
    private boolean isFeatured;

    @JsonProperty("isAdmin")
    private boolean isAdmin;

    @JsonProperty("showAds")
    private boolean showAds;

    @JsonProperty("isExternal")
    private boolean isExternal;

    @JsonProperty("isPaphus")
    private boolean isPaphus;

    @JsonProperty("creator")
    private String creator;

    @JsonProperty("creationDate")
    private String creationDate;

    @JsonProperty("connects")
    private int connects;

    @JsonProperty("dailyConnects")
    private int dailyConnects;

    @JsonProperty("weeklyConnects")
    private int weeklyConnects;

    @JsonProperty("monthlyConnects")
    private int monthlyConnects;

    @JsonProperty("thumbsUp")
    private int thumbsUp;

    @JsonProperty("thumbsDown")
    private int thumbsDown;

    @JsonProperty("stars")
    private double stars;

    @JsonProperty("website")
    private String website;

    @JsonProperty("subdomain")
    private String subdomain;

    @JsonProperty("description")
    private String description;

    @JsonProperty("details")
    private String details;

    @JsonProperty("disclaimer")
    private String disclaimer;

    @JsonProperty("categories")
    private String categories;

    @JsonProperty("tags")
    private String tags;

    @JsonProperty("license")
    private String license;

    @JsonProperty("avatar")
    private String avatar;
}