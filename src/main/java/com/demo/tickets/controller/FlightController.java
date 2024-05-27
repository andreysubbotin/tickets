package com.demo.tickets.controller;

import com.demo.tickets.dto.FlFlightDtoMapper;
import com.demo.tickets.dto.FlightDto;
import com.demo.tickets.external.flights.api.FlightControllerApi;
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

    private final FlFlightDtoMapper flFlightDtoMapper;

    public FlightController(FlightControllerApi flightControllerApi,
                            FlFlightDtoMapper flFlightDtoMapper) {
        this.flightControllerApi = flightControllerApi;
        this.flFlightDtoMapper = flFlightDtoMapper;
    }

    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    @QueryMapping(name = "flightList")
    public List<FlightDto> getList(@Argument @NonNull Integer from,
                                   @Argument @NonNull Integer to,
                                   @Argument @NonNull LocalDate dateMin,
                                   @Argument @NonNull LocalDate dateMax) {
        return flightControllerApi.findByAirportsAndDates(from, to, dateMin, dateMax).stream().map(flFlightDtoMapper::toDto).collect(Collectors.toList());
    }
}