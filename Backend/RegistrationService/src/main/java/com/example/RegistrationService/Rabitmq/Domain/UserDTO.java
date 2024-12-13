package com.example.RegistrationService.Rabitmq.Domain;

import com.example.RegistrationService.Costants.MaskingCostants;
import com.example.common_data.Masking.MaskDataGeneric;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String userId;
    @JsonProperty("isOwner")
    private boolean isOwner;
    @JsonProperty("isActivated")
    private boolean isActivated;
    private String email;
    private String name1;
    private String mobNo;
    private String password;
    private String city;
    @JsonIgnore
    private transient final Cache<String, String> originalData = Caffeine.newBuilder().maximumSize(1000).build();
    public void setMobNo(String mobNo) {
        originalData.put("mobNo", mobNo);
        this.mobNo = MaskDataGeneric.maskValue(mobNo, MaskingCostants.mobNo);
    }
    @JsonGetter("mobNo")
    public String getMobNo() {
        return this.mobNo;
    }
    public void setEmail(String email) {
        originalData.put("email", email);
        this.email = MaskDataGeneric.maskValue(email, MaskingCostants.email);
    }
    @JsonGetter("email")
    public String getEmail() {
        return this.email;
    }

}
