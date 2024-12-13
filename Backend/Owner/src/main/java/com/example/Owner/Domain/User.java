package com.example.Owner.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "Owners")
public class User {
    @Id
    private String userId;
    @JsonProperty("isOwner")
    private boolean isOwner;
    private boolean isActivated;
    @Field("activation_key")
    @JsonIgnore
    private String activationKey;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String name1;
    private String mobNo;
    private String password;
    private String city;

    public User(User user) {
    }
}
