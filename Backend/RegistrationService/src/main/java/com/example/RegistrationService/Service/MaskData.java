package com.example.RegistrationService.Service;

import com.example.RegistrationService.Costants.MaskingCostants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

public class MaskData {
    public static String maskFun(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String data = getJsonString(object);
        Map<String, String> maskMap = new TreeMap<>();
        maskMap.put("email", MaskingCostants.email);
        maskMap.put("mobNo",MaskingCostants.mobNo);
       return maskJsonResponse(data,maskMap);
    }
    public static String maskJsonResponse(String jsonData, Map<String, String> maskMap) throws JsonProcessingException {
        if (Objects.nonNull(jsonData) && !jsonData.isEmpty() && Objects.nonNull(maskMap) && maskMap.size() > 0) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode jsonNode = objectMapper.createObjectNode();
            if (isJsonArrayString(jsonData)) {
                jsonNode.set("response", objectMapper.readTree(jsonData));
                maskMap = processMap(maskMap);
            } else {
                jsonNode = (ObjectNode) objectMapper.readTree(jsonData);
            }
            Set<Map.Entry<String, String>> entries = maskMap.entrySet();
            for (Map.Entry<String, String> entry : entries) {
                maskJson(jsonNode, entry.getKey(), 0, entry.getKey().split("\\.").length, entry.getValue());
            }
            return !isJsonArrayString(jsonData) ? jsonNode.toPrettyString() : jsonNode.remove("response").toPrettyString();
        }
        return jsonData;
    }

    public static void maskJson(JsonNode jsonNode, String path, int start, int end, String maskPattern) {
        Iterator<Map.Entry<String, JsonNode>> fields = jsonNode.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            if (end > start) {
                String arr[] = path.split("\\.");
                if (field.getKey().equalsIgnoreCase(arr[start])) {
                    if (field.getValue() instanceof ArrayNode) {
                        ArrayNode arrayNode = (ArrayNode) field.getValue();
                        ++start;
                        for (JsonNode node : arrayNode) {
                            ObjectNode nodeObj = (ObjectNode) node;
                            maskJson(nodeObj, path, start, end, maskPattern);
                        }
                    } else if (field.getValue() instanceof ObjectNode) {
                        ObjectNode node = (ObjectNode) field.getValue();
                        maskJson(node, path, ++start, end, maskPattern);
                    } else if (Objects.nonNull(field.getValue())) {
                        field.setValue(new TextNode(field.getValue().asText().replaceAll(maskPattern, "*")));
                    }
                }
            } else {
                break;
            }
        }
    }

    private static boolean isJsonArrayString(String jsonStr) {
        return jsonStr.startsWith("[") && jsonStr.endsWith("]");
    }

    private static Map<String, String> processMap(Map<String, String> maskMap) {
        if (Objects.nonNull(maskMap) && maskMap.size() > 0) {
            Map<String, String> processMap = new TreeMap<>();
            maskMap.entrySet().stream().forEach(entry -> {
                processMap.put("response." + entry.getKey(), entry.getValue());
            });
            return processMap;
        }
        return maskMap;
    }
    private static String getJsonString(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.disable(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES);
        return objectMapper.writeValueAsString(object);
    }
}
