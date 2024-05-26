package com.demo.tickets.external.flights;

import com.demo.tickets.external.flights.ApiClient;
import com.demo.tickets.external.flights.api.AirportControllerApi;
import com.demo.tickets.external.flights.api.FlightControllerApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Instantiates generated "flights" OpenAPI client classes as beans.
 */
@Configuration
public class FlightsClientConfiguration {

    @Bean("flightsApiClient")
    public ApiClient apiClient(
            @Value("${tickets.openapi.client.flights.base-path}") String basePath,
            @Value("${tickets.openapi.client.flights.username}") String username,
            @Value("${tickets.openapi.client.flights.password}") String password
    ) {
        ApiClient client = new ApiClient("basic");
        client.setBasePath(basePath);
        client.setCredentials(username, password);

        return client;
    }

    @Bean("flightsAirportControllerApi")
    public AirportControllerApi airportControllerApi(ApiClient apiClient) {
        return apiClient.buildClient(AirportControllerApi.class);
    }

    @Bean("flightsFlightControllerApi")
    public FlightControllerApi flightControllerApi(ApiClient apiClient) {
        return apiClient.buildClient(FlightControllerApi.class);
    }
}

