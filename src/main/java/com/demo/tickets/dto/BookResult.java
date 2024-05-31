package com.demo.tickets.dto;

import com.demo.tickets.dto.TicketDto;

public class BookResult {
    private TicketDto ticket;

    public TicketDto getTicket() {
        return ticket;
    }

    public void setTicket(TicketDto ticket) {
        this.ticket = ticket;
    }
}
