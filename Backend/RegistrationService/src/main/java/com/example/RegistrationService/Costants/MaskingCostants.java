package com.example.RegistrationService.Costants;

public interface MaskingCostants {
    String email="(?<=.)[^@\\n](?=[^@\\n]*?[^@\\n]@)|(?:(?<=@.)|(?!^)\\G(?=[^@\\n]*$)).(?=.*[^@\\n]\\.)";
    String name1=".(?=.{0})";
    String mobNo=".(?=.{4})";
}
