package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.demo.tickets.dto.TicketDto;
import com.demo.tickets.dto.TicketMapper;
import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.mongo.TicketRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class TicketController {
    private final TicketRepository crudRepository;
    private final TicketMapper mapper;

    public TicketController(TicketRepository crudRepository, TicketMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @QueryMapping(name = "ticketList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<TicketDto> findAll(@Argument("page") OffsetPageInput pageInput) {
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()))
                .orElseGet(() -> PageRequest.ofSize(20));
        Page<Ticket> pageData = crudRepository.findAll(page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "ticket")
    @Transactional(readOnly = true)
    @NonNull
    public TicketDto findById(@GraphQLId @Argument @NonNull String id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }
}