package com.example.Admin.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Hotel {
    @Id
    private String registrationId;
}
