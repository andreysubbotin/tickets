package com.demo.tickets.mongo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    Page<Ticket> findByClientId(UUID clientId, Pageable pageable);

}