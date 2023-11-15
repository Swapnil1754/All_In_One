package com.example.Admin.Domain;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document
public class Hotel {
    @Id
    private String registrationId;
}
