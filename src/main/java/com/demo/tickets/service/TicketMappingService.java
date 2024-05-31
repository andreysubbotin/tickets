package com.demo.tickets.service;

import com.demo.tickets.dto.ClientDto;
import com.demo.tickets.dto.ClientMapper;
import com.demo.tickets.dto.FlightDto;
import com.demo.tickets.dto.FtFlightDtoMapper;
import com.demo.tickets.external.flight.api.FlightControllerApi;
import com.demo.tickets.jpa.ClientRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketMappingService {
    private final ClientMapper clientMapper;
    private final FtFlightDtoMapper flightMapper;
    private final FlightControllerApi flightControllerApi;

    private final ClientRepository clientRepository;

    public TicketMappingService(ClientRepository clientRepository,
                                ClientMapper clientMapper,
                                FtFlightDtoMapper flightMapper,
                                @Qualifier("flightFlightControllerApi") FlightControllerApi flightControllerApi) {
        this.clientMapper = clientMapper;
        this.flightMapper = flightMapper;
        this.flightControllerApi = flightControllerApi;
        this.clientRepository = clientRepository;
    }

    public FlightDto ticketById(Long flightId) {
        return flightMapper.toDto(flightControllerApi.findById(flightId));
    }

    public ClientDto clientById(UUID clientId) {
        return clientRepository.findById(clientId)
                .map(clientMapper::toDto)
                .orElse(null);
    }
}
