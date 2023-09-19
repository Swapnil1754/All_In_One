package com.example.Hotels.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Menu {
    private String itemName;
    private double price;
    private double ratings;
    private Byte[] image;
}
