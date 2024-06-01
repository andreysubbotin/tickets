package com.demo.tickets.dto;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Objects;

/**
 * DTO for {@link com.demo.tickets.external.flight.model.FlFlightDto}
 */
public class FlightDto implements Serializable {
    private Long id;
    private Integer number;
    private String airlineName;
    private String airlineCode;
    private AirportDto fromAirport;
    private AirportDto toAirport;
    private OffsetDateTime takeoffDate;
    private OffsetDateTime landingDate;

    public FlightDto() {
    }

    public FlightDto(Long id, Integer number, String airlineName, String airlineCode, AirportDto fromAirport, AirportDto toAirport, OffsetDateTime takeoffDate, OffsetDateTime landingDate) {
        this.id = id;
        this.number = number;
        this.airlineName = airlineName;
        this.airlineCode = airlineCode;
        this.fromAirport = fromAirport;
        this.toAirport = toAirport;
        this.takeoffDate = takeoffDate;
        this.landingDate = landingDate;
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

    public String getAirlineCode() {
        return airlineCode;
    }

    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
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

    public OffsetDateTime getTakeoffDate() {
        return takeoffDate;
    }

    public void setTakeoffDate(OffsetDateTime takeoffDate) {
        this.takeoffDate = takeoffDate;
    }

    public OffsetDateTime getLandingDate() {
        return landingDate;
    }

    public void setLandingDate(OffsetDateTime landingDate) {
        this.landingDate = landingDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FlightDto entity = (FlightDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.number, entity.number) &&
                Objects.equals(this.airlineName, entity.airlineName) &&
                Objects.equals(this.airlineCode, entity.airlineCode) &&
                Objects.equals(this.fromAirport, entity.fromAirport) &&
                Objects.equals(this.toAirport, entity.toAirport) &&
                Objects.equals(this.takeoffDate, entity.takeoffDate) &&
                Objects.equals(this.landingDate, entity.landingDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, number, airlineName, airlineCode, fromAirport, toAirport, takeoffDate, landingDate);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "number = " + number + ", " +
                "airlineName = " + airlineName + ", " +
                "airlineCode = " + airlineCode + ", " +
                "fromAirport = " + fromAirport + ", " +
                "toAirport = " + toAirport + ", " +
                "takeoffDate = " + takeoffDate + ", " +
                "landingDate = " + landingDate + ")";
    }
}