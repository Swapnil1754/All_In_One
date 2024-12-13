package com.example.RegistrationService.Utils;

import com.example.common_data.Masking.MaskDataGeneric;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

public class MaskingUtils {
    public static final Cache<String, String> originalValue = Caffeine.newBuilder().maximumSize(1000).expireAfterAccess(500, TimeUnit.SECONDS).build();
    private static final Logger logger = LoggerFactory.getLogger(MaskDataGeneric.class);
    public static String maskValue(String context, String key, String value, String pattern) {
        if (Objects.nonNull(value) && !value.isEmpty() && Objects.nonNull(pattern) && !pattern.isEmpty()) {
            String uniqueKey = generateUniqueKey(context, key);
            originalValue.put(uniqueKey, value);
            return value.replaceAll(pattern, "*");
        }
        return value;
    }
    private static String generateUniqueKey(String context, String key) {
        return new StringBuilder().append(context).append(":").append(key).toString();
    }
    public static String unmaskValue(String context, String key) {
        String uniqueKey = generateUniqueKey(context, key);
        String unMasked = originalValue.getIfPresent(uniqueKey);
        if (unMasked == null) {
            logger.warn("MaskDataGeneric - No original value found for key: {}", uniqueKey);
        }
        return unMasked;
    }
}
