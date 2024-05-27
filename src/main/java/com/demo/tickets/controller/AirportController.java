package com.demo.tickets.controller;

import com.demo.tickets.dto.AirportDto;
import com.demo.tickets.dto.FlAirportDtoMapper;
import com.demo.tickets.external.flights.api.AirportControllerApi;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class AirportController {

    private final AirportControllerApi airportControllerApi;

    private final FlAirportDtoMapper flAirportDtoMapper;

    public AirportController(AirportControllerApi airportControllerApi,
                             FlAirportDtoMapper flAirportDtoMapper) {
        this.airportControllerApi = airportControllerApi;
        this.flAirportDtoMapper = flAirportDtoMapper;
    }

    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    @QueryMapping(name = "airportList")
    public List<AirportDto> getList() {
        return airportControllerApi.getList().stream()
                .map(flAirportDtoMapper::toDto)
                .collect(Collectors.toList());
    }
}