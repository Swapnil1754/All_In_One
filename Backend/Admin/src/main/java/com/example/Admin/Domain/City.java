package com.example.Admin.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Document
public class City {
    @JsonProperty("cityName")
    private String cityName;
    private String state;
    private String nation;
    private byte[] cityImage;
}
