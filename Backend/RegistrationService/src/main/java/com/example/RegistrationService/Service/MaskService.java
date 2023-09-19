package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.PatternList;
import com.example.RegistrationService.Domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
@Component
public class MaskService {

    public static User dataMaskFun(Object object) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String data = getJsonString(object);
        String userData = maskData(data);
        User user = null;
        Gson gson = new Gson();
        user = gson.fromJson(userData, User.class);
        return user;

    }
    private static String maskData(String jsonString) throws IOException {
        String finalString = jsonString.replace("\\","");
        finalString = finalString.replaceAll("\\\\","");
        StringBuilder stringBuilder = new StringBuilder(finalString);
        List<PatternList> patternLists = getMidasMaskPattern();
        try {
            for (PatternList patternList:patternLists){
                patternList.getKeywords().forEach(key->{
                    if (key.equalsIgnoreCase("email") || key.equalsIgnoreCase("name1") || key.equalsIgnoreCase("mobNo")){
                        String regex ="\"" + key + "\"\\s*:\\s*\"(.*?)\"";
                        Matcher matcher = Pattern.compile(regex,Pattern.MULTILINE).matcher(stringBuilder);
                        while (matcher.find()){
                            IntStream.rangeClosed(1, matcher.groupCount()).forEach(x->{
                                if (Objects.nonNull(matcher.group(x))&&!matcher.group(x).equalsIgnoreCase("null")) {
                                    stringBuilder.replace(matcher.start(x), matcher.end(x), matcher.group(x).replaceAll(patternList.getMaskPattern(), "*"));
                                }
                            });
                        }
                    }
                });
            }
        }catch (StringIndexOutOfBoundsException e) {
        }
        return stringBuilder.toString();
    }
    private static String getJsonString(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        objectMapper.disable(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES);
        return objectMapper.writeValueAsString(object);
    }
    private static List<PatternList> getMidasMaskPattern() throws IOException {
        String filePath = "C:\\MMY Project\\MakeMyYatraa\\UAT_Masking_Dump.xlsx";
        FileInputStream fileInputStream = new FileInputStream(filePath);
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(fileInputStream);
        XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
        List<PatternList> midasMaskPatternList = new ArrayList<>();
        xssfSheet.forEach(data -> {
            midasMaskPatternList.add(new PatternList(data.getCell(2).getStringCellValue(),
                    (HashSet<String>) Arrays.stream(data.getCell(3).getStringCellValue().split(",")).collect(Collectors.toSet())));
        });
        midasMaskPatternList.remove(0);
        return midasMaskPatternList;
    }
}
