package com.demo.tickets.external.flight;

import com.demo.tickets.external.flight.ApiClient;
import com.demo.tickets.external.flight.api.AirportControllerApi;
import com.demo.tickets.external.flight.api.FlightControllerApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Instantiates generated "flight" OpenAPI client classes as beans.
 */
@Configuration
public class FlightClientConfiguration {

    @Bean("flightApiClient")
    public ApiClient apiClient(
            @Value("${tickets.openapi.client.flight.base-path}") String basePath,
            @Value("${tickets.openapi.client.flight.username}") String username,
            @Value("${tickets.openapi.client.flight.password}") String password
    ) {
        ApiClient client = new ApiClient("basic");
        client.setBasePath(basePath);
        client.setCredentials(username, password);

        return client;
    }

    @Bean("flightAirportControllerApi")
    public AirportControllerApi airportControllerApi(ApiClient apiClient) {
        return apiClient.buildClient(AirportControllerApi.class);
    }

    @Bean("flightFlightControllerApi")
    public FlightControllerApi flightControllerApi(ApiClient apiClient) {
        return apiClient.buildClient(FlightControllerApi.class);
    }
}

