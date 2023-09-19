package com.example.RegistrationService.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatternList {
    private String maskPattern;
    HashSet<String> keywords = new HashSet<>();
}
