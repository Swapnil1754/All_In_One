package com.example.BookingService.Service;

import com.example.BookingService.Exceptions.SendSMSException;
import com.vonage.client.VonageClient;
import com.vonage.client.sms.MessageStatus;
import com.vonage.client.sms.SmsSubmissionResponse;
import com.vonage.client.sms.messages.TextMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsServiceImpl implements SmsService {
    @Value("${vonage.api-key}")
    private String apikey;
    @Value("${vonage.api-secret}")
    private String apiSecret;
    @Value("${vonage.phone-number}")
    private String fromNumber;
    @Override
    public void sendSms(String receiver, String message) {
        try {
            VonageClient client = VonageClient.builder().apiKey("79e24189").apiSecret(apiSecret).build();
            System.out.println("from: "+ fromNumber + "To: "+ receiver + "apiKey: "+apikey+"apisec: "+ apiSecret);
            TextMessage textMessage = new TextMessage(fromNumber, receiver, message);
            SmsSubmissionResponse response = client.getSmsClient().submitMessage(textMessage);
            if (response.getMessages().get(0).getStatus() == MessageStatus.OK) {
                System.out.println("Message Sent Successfully");
            } else {
                System.out.println("Error while processing message..." + response.getMessages().get(0).getErrorText());
            }
        } catch (Exception s) {
            throw new SendSMSException(s.getMessage());
        }
    }
}
