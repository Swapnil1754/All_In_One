package com.example.NotificationService.Service;

import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.google.cloud.dialogflow.v2.QueryInput;
import com.google.cloud.dialogflow.v2.SessionName;
import com.google.cloud.dialogflow.v2.SessionsClient;
import com.google.cloud.dialogflow.v2.TextInput;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DialogflowService {
    private final String projectId = "make-my-yatraa";
    private final String sessionId = UUID.randomUUID().toString();
    public String detectIntent(String text) throws Exception {
        try (SessionsClient sessionsClient = SessionsClient.create()) {
            SessionName sessionName = SessionName.of(projectId, sessionId);
            TextInput textInput = TextInput.newBuilder().setText(text).setLanguageCode("en-US").build();
            QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();
            DetectIntentResponse response = sessionsClient.detectIntent(sessionName, queryInput);
            return response.getQueryResult().getFulfillmentText();
        }
    }

}
