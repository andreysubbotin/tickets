package com.demo.tickets.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.demo.tickets.mongo.Ticket}
 */
public class TicketDto implements Serializable {
    private String id;
    private BigDecimal price;
    private String createdBy;
    private LocalDateTime createdDate;
    private ClientDto client;
    private FlightDto flight;

    public TicketDto() {
    }

    public TicketDto(String id, BigDecimal price, String createdBy, LocalDateTime createdDate) {
        this.id = id;
        this.price = price;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ClientDto getClient() {
        return client;
    }

    public void setClient(ClientDto client) {
        this.client = client;
    }

    public FlightDto getFlight() {
        return flight;
    }

    public void setFlight(FlightDto flight) {
        this.flight = flight;
    }
}