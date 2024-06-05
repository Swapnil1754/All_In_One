package com.example.EmailService.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class HotelBooking {
    private String bookingId;
    private String userName;
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
