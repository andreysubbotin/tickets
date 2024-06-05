package com.demo.tickets.service;

import com.demo.notifications.TicketConfirmationMessage;
import com.demo.tickets.external.flight.api.FlightControllerApi;
import com.demo.tickets.external.flight.model.FlFlightDto;
import com.demo.tickets.jpa.Client;
import com.demo.tickets.jpa.ClientRepository;
import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.mongo.TicketRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final FlightControllerApi flightControllerApi;
    private final ClientRepository clientRepository;
    private final NotificationService notificationService;

    private final ReceiptService receiptService;

    public TicketService(TicketRepository ticketRepository,
                         FlightControllerApi flightControllerApi,
                         ClientRepository clientRepository,
                         NotificationService notificationService,
                         ReceiptService receiptService) {
        this.ticketRepository = ticketRepository;
        this.flightControllerApi = flightControllerApi;
        this.clientRepository = clientRepository;
        this.notificationService = notificationService;
        this.receiptService = receiptService;
    }

    public void bookTicket(Long flightId, UUID clientId) {
        FlFlightDto flight = flightControllerApi.findById(flightId);
        if (flight == null) {
            throw new IllegalStateException(String.format("Flight %s not found", flightId));
        }
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException(String.format("Client %s not found", clientId)));

        Ticket ticket = createTicket(flightId, clientId);
        notifyClient(client, flight, ticket);
    }

    private Ticket createTicket(Long flightId, UUID clientId) {
        Ticket ticket = new Ticket();
        ticket.setClientId(clientId);
        ticket.setFlightId(flightId);
        int price = ThreadLocalRandom.current().nextInt(100, 200);
        ticket.setPrice(new BigDecimal(price));

        String fileId = receiptService.createAndSaveReceipt(ticket);
        ticket.setReceipt(fileId);

        ticket = ticketRepository.save(ticket);
        return ticket;
    }

    private void notifyClient(Client client, FlFlightDto flight, Ticket ticket) {
        TicketConfirmationMessage message = new TicketConfirmationMessage();
        message.setEmail(client.getEmail());
        if (flight.getNumber() != null) {
            message.setFlightNumber(flight.getAirlineCode() + flight.getNumber().toString());
        }
        message.setPassengerName(client.getFirstName() + " " + client.getLastName());
        if (flight.getTakeoffDate() != null) {
            message.setTakeoffDate(flight.getTakeoffDate().toLocalDateTime());
        }
        notificationService.sendTicketMessage(message);
    }
}
