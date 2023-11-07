package com.example.Admin.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User_Registration")
public class User {
    @Id
    private String userId;
    @JsonProperty("isOwner")
    private boolean isOwner;
    @JsonProperty("isActivated")
    private boolean isActivated;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String name1;
    private String mobNo;
    private String password;
    private String city;
}
