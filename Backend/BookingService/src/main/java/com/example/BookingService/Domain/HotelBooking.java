package com.example.BookingService.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HotelBooking {
    @Id
    private String bookingId;
    private String userName;
    @JsonProperty("mobNo")
    private String mobNo;
    @JsonProperty("hotelName")
    private String hotelName;
    private String roomCatagory;
    private String roomType;
    private Date fromDate;
    private Date toDate;
    private int noOfPeoples;
    private int noOfDays;
    private int noOfRooms;
    private double cost;
}
