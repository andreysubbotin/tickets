package com.demo.tickets.dto;

import com.demo.tickets.external.flights.model.FlAirportDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FlAirportDtoMapper {
    FlAirportDto toEntity(AirportDto airportDto);

    AirportDto toDto(FlAirportDto flAirportDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    FlAirportDto partialUpdate(AirportDto airportDto, @MappingTarget FlAirportDto flAirportDto);
}