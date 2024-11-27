package com.example.Admin.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Id
    private String userId;
    @JsonProperty("isOwner")
    private boolean isOwner;
    @JsonProperty("isActivated")
    private boolean isActivated;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String name1;
    private String mobNo;
    private String password;
    private String city;
}
