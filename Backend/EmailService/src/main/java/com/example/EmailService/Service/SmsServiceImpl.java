package com.example.EmailService.Service;

import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class SmsServiceImpl implements SmsService {
    @Override
    public String sendOtpBySms(String message, String receiver) {
        try {
            String apiKey = "WaXyuf7Cidl3naCna9CoPkQuPWOeOJUxg7M0952mZ1ftPy2rmnv1ZnCXD9fH";
            String sendId = "FSTSMS";
            message = URLEncoder.encode(message, "UTF-8");
            String language = "english";
            String route = "p";
            String myUrl = "https://www.fast2sms.com/dev/bulkV2?authorization=" + apiKey + "&sender_id="+sendId+"&message="+message+"&langauge="+language+"&route="+route+"&numbers="+receiver;
            URL url = new URL(myUrl);
            HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-agent", "Mozilla/5.0");
            connection.setRequestProperty("cache-control", "no-cache");
            int code = connection.getResponseCode();
            System.out.println("Response: "+ code);
            StringBuffer response = new StringBuffer();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            while (true) {
                String line = reader.readLine();
                if (line == null) {
                    break;
                } else {
                    response.append(line);
                }
                System.out.println("Final Response: "+response);
            }
            return message;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
