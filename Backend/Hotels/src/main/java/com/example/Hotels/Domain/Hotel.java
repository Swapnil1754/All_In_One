package com.example.Hotels.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document
public class Hotel {
    @Id
    private String registrationId;
    private String hotelName;
    private String ownerName;
    private String city;
    private double rating;
    private byte[] image;
    private List<Menu> menus;
    private List<Room> rooms;
}
