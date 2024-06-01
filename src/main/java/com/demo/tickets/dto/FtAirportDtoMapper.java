package com.demo.tickets.dto;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FtAirportDtoMapper {
//    FlAirportDto toEntity(AirportDto airportDto);
//
//    AirportDto toDto(FlAirportDto ftAirportDto);
//
//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    FlAirportDto partialUpdate(AirportDto airportDto, @MappingTarget FlAirportDto ftAirportDto);
}