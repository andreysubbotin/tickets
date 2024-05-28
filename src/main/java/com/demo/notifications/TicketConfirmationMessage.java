package com.demo.notifications;

import java.time.LocalDateTime;

public class TicketConfirmationMessage {
    private String email;
    private String flightNumber;
    private LocalDateTime takeoffDate;
    private String passengerName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public LocalDateTime getTakeoffDate() {
        return takeoffDate;
    }

    public void setTakeoffDate(LocalDateTime takeoffDate) {
        this.takeoffDate = takeoffDate;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }
}
