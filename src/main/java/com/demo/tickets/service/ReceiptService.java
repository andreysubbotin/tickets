//package com.demo.tickets.service;
//
//import com.demo.tickets.MinioService;
//import com.demo.tickets.external.flight.api.FlightControllerApi;
//import com.demo.tickets.external.flight.model.FlFlightDto;
//import com.demo.tickets.jpa.Client;
//import com.demo.tickets.jpa.ClientRepository;
//import com.demo.tickets.mongo.Ticket;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayInputStream;
//import java.nio.charset.StandardCharsets;
//import java.time.format.DateTimeFormatter;
//import java.time.format.FormatStyle;
//import java.util.UUID;
//
//@Service
//public class ReceiptService {
//    private final MinioService minioService;
//    private final String receiptsBucket;
//    private final FlightControllerApi flightControllerApi;
//    private final ClientRepository clientRepository;
//
//    public static final String TEMPLATE = """
//            Flight number: %s
//            Client name: %s
//            From: %s
//            To: %s\s
//            Date and time: %s
//            Price: %s""";
//
//
//    public ReceiptService(MinioService minioService,
//                          @Value("${minio.bucket.ticket.receipt}") String receiptsBucket,
//                          ClientRepository clientRepository,
//                          FlightControllerApi flightControllerApi) {
//        this.minioService = minioService;
//        this.receiptsBucket = receiptsBucket;
//        this.flightControllerApi = flightControllerApi;
//        this.clientRepository = clientRepository;
//    }
//
//    public String createAndSaveReceipt(Ticket ticket) {
//        String receiptText = generateText(ticket);
//        String fileId = UUID.randomUUID() + ".txt";
//        minioService.uploadFile(
//                receiptsBucket,
//                fileId,
//                new ByteArrayInputStream(receiptText.getBytes(StandardCharsets.UTF_8)),
//                "text/plain"
//        );
//
//        return fileId;
//    }
//
//    private String generateText(Ticket ticket) {
//        Client client = clientRepository.findById(ticket.getClientId()).orElseThrow(() ->
//                new IllegalStateException(String.format("Client %s not found", ticket.getClientId())));
//        FlFlightDto flight = flightControllerApi.findById(ticket.getFlightId());
//
//        String flightNumber = flight.getAirlineCode() + flight.getNumber();
//        String clientName = client.getFirstName() + " " + client.getLastName();
//        String from = flight.getFromAirport().getName();
//        String to = flight.getToAirport().getName();
//
//        DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
//        String dateTime = dateFormatter.format(flight.getTakeoffDate());
//
//        return String.format(TEMPLATE, flightNumber, clientName, from, to, dateTime, ticket.getPrice());
//    }
//}
