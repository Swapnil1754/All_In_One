package com.example.Hotels.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Room {
    @Id
    private String roomId;
    @Indexed(unique = true)
    @JsonProperty("roomCategory")
    private String roomCategory;
    @JsonProperty("roomType")
    private String roomType;
    @JsonProperty("price")
    private double price;

    private List<List<Byte>> images;
    private List<String> aminitiesList;
    private List<String> termsAndConditions;
}
