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
}