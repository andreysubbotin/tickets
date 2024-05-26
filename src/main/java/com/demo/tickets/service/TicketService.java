package com.demo.tickets.service;

import com.demo.tickets.dto.BookResult;
import com.demo.tickets.dto.TicketMapper;
import com.demo.tickets.external.flights.api.FlightControllerApi;
import com.demo.tickets.external.flights.model.FlFlightDto;
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

    private final TicketMapper ticketMapper;

    public TicketService(TicketRepository ticketRepository,
                         FlightControllerApi flightControllerApi,
                         ClientRepository clientRepository,
                         TicketMapper ticketMapper) {
        this.ticketRepository = ticketRepository;
        this.flightControllerApi = flightControllerApi;
        this.clientRepository = clientRepository;
        this.ticketMapper = ticketMapper;
    }

    public BookResult bookTicket(Long flightId, UUID clientId) {
        FlFlightDto flight = flightControllerApi.findById(flightId);
        if (flight == null) {
            throw new IllegalStateException(String.format("Client %s not found", flightId));
        }
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException(String.format("Client %s not found", clientId)));

        Ticket ticket = createTicket(flightId, clientId);
        BookResult res = new BookResult();
        res.setTicket(ticketMapper.toDto(ticket));
        return res;
    }

    private Ticket createTicket(Long flightId, UUID clientId) {
        Ticket ticket = new Ticket();
        ticket.setClientId(clientId);
        ticket.setFlightId(flightId);
        int price = ThreadLocalRandom.current().nextInt(100, 200);
        ticket.setPrice(new BigDecimal(price));

        ticket = ticketRepository.save(ticket);
        return ticket;
    }
}
