package com.example.Bus.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "Owners")
public class User {
    @Id
    private String userId;
    @Transient
    private boolean isOwner;
    private boolean isActivated;
    @Field("activation_key")
    @JsonIgnore
    private String activationKey;
    private String email;
    private String name1;
    private String mobNo;
    private String password;
    private String city;
}
