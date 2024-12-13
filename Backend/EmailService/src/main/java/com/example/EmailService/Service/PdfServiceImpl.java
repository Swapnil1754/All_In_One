package com.example.EmailService.Service;

import com.example.EmailService.Domain.HotelBooking;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class PdfServiceImpl implements Pdfservice {

    @Override
    public byte[] generatePdf(HotelBooking booking) {
        try {
            String content = loadHtmlTemplate("bill-template.html", booking);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ITextRenderer renderer = new ITextRenderer();

            renderer.setDocumentFromString(content);
            renderer.layout();
            renderer.createPDF(outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }


    private String loadHtmlTemplate(String templatePath, HotelBooking booking) {
        try {
            ClassPathResource resource = new ClassPathResource("Template/" + templatePath);
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }

            // Replace placeholders with actual data
            content.replace(content.indexOf("${booking.hotelName}"), content.indexOf("${booking.hotelName}") + "${booking.hotelName}".length(), String.valueOf(booking.getHotelName()));
            content.replace(content.indexOf("${booking.bookingId}"), content.indexOf("${booking.bookingId}") + "${booking.bookingId}".length(), String.valueOf(booking.getBookingId()));
            content.replace(content.indexOf("${booking.roomCategory}"), content.indexOf("${booking.roomCategory}") + "${booking.roomCategory}".length(), String.valueOf(booking.getRoomCategory()));
            content.replace(content.indexOf("${booking.roomType}"), content.indexOf("${booking.roomType}") + "${booking.roomType}".length(), String.valueOf(booking.getRoomType()));
            content.replace(content.indexOf("${booking.fromDate}"), content.indexOf("${booking.fromDate}") + "${booking.fromDate}".length(), String.valueOf(booking.getFromDate()));
            content.replace(content.indexOf("${booking.toDate}"), content.indexOf("${booking.toDate}") + "${booking.toDate}".length(), String.valueOf(booking.getToDate()));
            content.replace(content.indexOf("${booking.noOfDays}"), content.indexOf("${booking.noOfDays}") + "${booking.noOfDays}".length(), String.valueOf(booking.getNoOfDays()));
            content.replace(content.indexOf("${booking.noOfPeople}"), content.indexOf("${booking.noOfPeople}") + "${booking.noOfPeople}".length(), String.valueOf(booking.getNoOfPeoples()));
            content.replace(content.indexOf("${booking.noOfRooms}"), content.indexOf("${booking.noOfRooms}") + "${booking.noOfRooms}".length(), String.valueOf(booking.getNoOfRooms()));
            content.replace(content.indexOf("${booking.cost}"), content.indexOf("${booking.cost}") + "${booking.cost}".length(), String.valueOf(booking.getCost()));

            return content.toString();
        } catch (IOException e) {
            throw new RuntimeException("Error loading HTML template", e);
        }
    }

}
