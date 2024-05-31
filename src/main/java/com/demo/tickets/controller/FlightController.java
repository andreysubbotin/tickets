package com.demo.tickets.controller;

import com.demo.tickets.dto.FlightDto;
import com.demo.tickets.dto.FtFlightDtoMapper;
import com.demo.tickets.external.flight.api.FlightControllerApi;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class FlightController {

    private final FlightControllerApi flightControllerApi;

    private final FtFlightDtoMapper ftFlightDtoMapper;

    public FlightController(FlightControllerApi flightControllerApi,
                            FtFlightDtoMapper ftFlightDtoMapper) {
        this.flightControllerApi = flightControllerApi;
        this.ftFlightDtoMapper = ftFlightDtoMapper;
    }

    @Secured("ROLE_BOOKER")
    @NonNull
    @QueryMapping(name = "flightList")
    public List<FlightDto> findAll(@Argument @NonNull Integer from, @Argument @NonNull Integer to, @Argument @NonNull LocalDate dateMin, @Argument @NonNull LocalDate dateMax) {
        return flightControllerApi.findByAirportsAndDates(from, to, dateMin, dateMax).stream().map(ftFlightDtoMapper::toDto).collect(Collectors.toList());
    }
}