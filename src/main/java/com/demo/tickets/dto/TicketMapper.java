package com.demo.tickets.dto;

import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.service.TicketMappingService;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = TicketMappingService.class)
public interface TicketMapper {
    Ticket toEntity(TicketDto ticketDto);

    @Mapping(source = "flightId", target = "flight")
    @Mapping(source = "clientId", target = "client")
    TicketDto toDto(Ticket ticket);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ticket partialUpdate(TicketDto ticketDto, @MappingTarget Ticket ticket);
}