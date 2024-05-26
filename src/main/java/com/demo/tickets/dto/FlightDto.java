package com.demo.tickets.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.demo.tickets.external.flights.model.FlFlightDto}
 */
public class FlightDto implements Serializable {
    private Long id;
    private Integer number;
    private String airlineName;
    private AirportDto fromAirport;
    private AirportDto toAirport;

    public FlightDto() {
    }

    public FlightDto(Long id, Integer number, String airlineName, AirportDto fromAirport, AirportDto toAirport) {
        this.id = id;
        this.number = number;
        this.airlineName = airlineName;
        this.fromAirport = fromAirport;
        this.toAirport = toAirport;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public AirportDto getFromAirport() {
        return fromAirport;
    }

    public void setFromAirport(AirportDto fromAirport) {
        this.fromAirport = fromAirport;
    }

    public AirportDto getToAirport() {
        return toAirport;
    }

    public void setToAirport(AirportDto toAirport) {
        this.toAirport = toAirport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FlightDto entity = (FlightDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.number, entity.number) &&
                Objects.equals(this.airlineName, entity.airlineName) &&
                Objects.equals(this.fromAirport, entity.fromAirport) &&
                Objects.equals(this.toAirport, entity.toAirport);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, number, airlineName, fromAirport, toAirport);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "number = " + number + ", " +
                "airlineName = " + airlineName + ", " +
                "fromAirport = " + fromAirport + ", " +
                "toAirport = " + toAirport + ")";
    }
}