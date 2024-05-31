package com.demo.tickets.dto;

import com.demo.tickets.external.flight.model.FtFlightDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FtFlightDtoMapper {
    FtFlightDto toEntity(FlightDto flightDto);

    FlightDto toDto(FtFlightDto ftFlightDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FtFlightDto partialUpdate(FlightDto flightDto, @MappingTarget FtFlightDto ftFlightDto);
}