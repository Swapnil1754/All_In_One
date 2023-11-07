package com.example.Admin.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Document
public class City {
    @Id
    private String cityName;
    private String state;
    private String nation;
    private byte[] cityImage;
}
