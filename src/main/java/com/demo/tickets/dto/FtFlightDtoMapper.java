package com.demo.tickets.dto;

import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface FtFlightDtoMapper {
//    FlFlightDto toEntity(FlightDto flightDto);
//
//    FlightDto toDto(FlFlightDto ftFlightDto);
//
//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    FlFlightDto partialUpdate(FlightDto flightDto, @MappingTarget FlFlightDto ftFlightDto);
}