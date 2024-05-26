package com.demo.tickets.dto;

import com.demo.tickets.external.flights.model.FlFlightDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FlFlightDtoMapper {
    FlFlightDto toEntity(FlightDto flightDto);

    FlightDto toDto(FlFlightDto flFlightDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FlFlightDto partialUpdate(FlightDto flightDto, @MappingTarget FlFlightDto flFlightDto);
}