package com.demo.tickets.controller;

import com.demo.tickets.dto.AirportDto;
import com.demo.tickets.dto.FtAirportDtoMapper;
import com.demo.tickets.external.flight.api.AirportControllerApi;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class AirportController {

    private final AirportControllerApi airportControllerApi;

    private final FtAirportDtoMapper ftAirportDtoMapper;

    public AirportController(AirportControllerApi airportControllerApi,
                             FtAirportDtoMapper ftAirportDtoMapper) {
        this.airportControllerApi = airportControllerApi;
        this.ftAirportDtoMapper = ftAirportDtoMapper;
    }

    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    @QueryMapping(name = "airportList")
    public List<AirportDto> findAll() {
        return airportControllerApi.getList().stream().map(ftAirportDtoMapper::toDto).collect(Collectors.toList());
    }
}