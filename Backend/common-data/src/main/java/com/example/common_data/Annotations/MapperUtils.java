package com.example.common_data.Annotations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

public final class MapperUtils {
    public static final Logger LOGGER = LoggerFactory.getLogger(MapperUtils.class);

    private MapperUtils() {
        throw new IllegalStateException("Initiating utility class not allowed");
    }

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T jsonStringToClass(String jsonString, Class<T> classType) {
        try {
            if (StringUtils.isEmpty(jsonString)) return null;
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            T obj = mapper.readValue(jsonString, classType);
            return obj;
        } catch (Exception e) {
            LOGGER.error("MapperUtil - jsonStringToClass - Exception Occurred : {}", ExceptionUtils.getStackTrace(e));
            return null;
        }
    }

    public static JsonNode toJsonNode(ObjectNode parent, Object object, String fieldName) {
        JsonNode jsonNode;
        if (object instanceof String  && isValid(object.toString())) {
            jsonNode = jsonStringToClass((String) object, JsonNode.class);
        } else {
            jsonNode = objectMapper.valueToTree(object);
        }
        parent.set(fieldName, jsonNode);
        return parent;
    }

    private static boolean isValid(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.readTree(json);
            return true;
        } catch (JsonProcessingException e) {
            return false;
        }
    }

    public static ObjectNode getParentNode() {
        return objectMapper.createObjectNode();
    }

    public static JsonNode stringToJson(String jsonStr) {
        try {
            if (StringUtils.isEmpty(jsonStr))
                return null;
            return new ObjectMapper().readValue(jsonStr, JsonNode.class);
        } catch (Exception e) {
            LOGGER.error("MapperUtil - stringToJson - Exception Occurred : {}", ExceptionUtils.getStackTrace(e));
        }
        return null;
    }

    public static String getJsonString(Object data) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
            objectMapper.disable(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES);
            return objectMapper.writeValueAsString(data);
        } catch (Exception e) {
            LOGGER.error("MapperUtil - getJsonString - Exception Occurred : {}", ExceptionUtils.getStackTrace(e));
        }
        return "";
    }
}
