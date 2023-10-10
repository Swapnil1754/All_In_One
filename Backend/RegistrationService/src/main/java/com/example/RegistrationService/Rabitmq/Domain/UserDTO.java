package com.example.RegistrationService.Rabitmq.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String userId;
    private boolean isOwner;
    private boolean isActivated;
    private String email;
    private String name1;
    private String mobNo;
    private String password;
    private String city;

}
