package com.example.Owner.Rabitmq.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String userId;
    private boolean isActivated;
    private boolean isOwner;
    private String email;
    private String name1;
    private String mobNo;
    private String password;
    private String city;
}
