package com.demo.tickets.dto;

import com.demo.tickets.dto.TicketDto;
import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.service.TicketService;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = TicketService.class)
public interface TicketMapper {
    Ticket toEntity(TicketDto ticketDto);

    @Mapping(source = "clientId", target = "client")
    @Mapping(source = "flightId", target = "flight")
    TicketDto toDto(Ticket ticket);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ticket partialUpdate(TicketDto ticketDto, @MappingTarget Ticket ticket);
}