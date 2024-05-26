package com.demo.tickets.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * DTO for {@link com.demo.tickets.mongo.Ticket}
 */
public class TicketDto implements Serializable {
    private String id;
    private BigDecimal price;
    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;
    private ClientDto client;
    private FlightDto flight;

    public TicketDto() {
    }

    public TicketDto(String id, BigDecimal price, String createdBy, LocalDateTime createdDate, String lastModifiedBy, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.price = price;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
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

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TicketDto entity = (TicketDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.price, entity.price) &&
                Objects.equals(this.createdBy, entity.createdBy) &&
                Objects.equals(this.createdDate, entity.createdDate) &&
                Objects.equals(this.lastModifiedBy, entity.lastModifiedBy) &&
                Objects.equals(this.lastModifiedDate, entity.lastModifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, price, createdBy, createdDate, lastModifiedBy, lastModifiedDate);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "price = " + price + ", " +
                "createdBy = " + createdBy + ", " +
                "createdDate = " + createdDate + ", " +
                "lastModifiedBy = " + lastModifiedBy + ", " +
                "lastModifiedDate = " + lastModifiedDate + ")";
    }
}