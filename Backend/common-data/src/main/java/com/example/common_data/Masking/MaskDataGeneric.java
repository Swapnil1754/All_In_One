package com.example.common_data.Masking;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

public class MaskDataGeneric {
    private static final Logger logger = LoggerFactory.getLogger(MaskDataGeneric.class);
    public static String maskValue(String value, String pattern) {
        if (Objects.nonNull(value) && !value.isEmpty() && Objects.nonNull(pattern) && !pattern.isEmpty()) {
            logger.info("MaskDataGeneric - maskValue - value: {}", value);
            return value.replaceAll(pattern, "*");
        }
        return value;
    }

}
