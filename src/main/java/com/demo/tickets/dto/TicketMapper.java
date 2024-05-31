package com.demo.tickets.dto;

import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.service.TicketMappingService;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING,
        uses = TicketMappingService.class)
public interface TicketMapper {

    @Mapping(source = "clientId", target = "client")
    @Mapping(source = "flightId", target = "flight")
    TicketDto toDto(Ticket ticket);

    void ticketDtoToTicket(TicketDto ticketDto, @MappingTarget Ticket ticket);
}