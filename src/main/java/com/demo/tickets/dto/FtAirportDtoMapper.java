package com.demo.tickets.dto;

import com.demo.tickets.external.flight.model.FtAirportDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FtAirportDtoMapper {
    FtAirportDto toEntity(AirportDto airportDto);

    AirportDto toDto(FtAirportDto ftAirportDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FtAirportDto partialUpdate(AirportDto airportDto, @MappingTarget FtAirportDto ftAirportDto);
}