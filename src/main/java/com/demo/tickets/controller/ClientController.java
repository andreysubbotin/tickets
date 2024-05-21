package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.demo.tickets.dto.ClientDto;
import com.demo.tickets.dto.ClientMapper;
import com.demo.tickets.jpa.Client;
import com.demo.tickets.jpa.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class ClientController {
    private final ClientRepository crudRepository;
    private final ClientMapper mapper;

    public ClientController(ClientRepository crudRepository, ClientMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @MutationMapping(name = "deleteClient")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull UUID id) {
        Client entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "clientList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<ClientDto> findAll(@Argument("page") OffsetPageInput pageInput) {
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()))
                .orElseGet(() -> PageRequest.ofSize(20));
        Page<Client> pageData = crudRepository.findAll(page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "client")
    @Transactional(readOnly = true)
    @NonNull
    public ClientDto findById(@GraphQLId @Argument @NonNull UUID id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateClient")
    @Transactional
    @NonNull
    public ClientDto update(@Argument @NonNull ClientDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Client entity = input.getId() == null
                ? new Client()
                : crudRepository.findById(input.getId()).orElseThrow();

        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }
}