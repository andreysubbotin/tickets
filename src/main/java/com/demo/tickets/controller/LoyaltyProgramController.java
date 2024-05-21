package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.demo.tickets.dto.LoyaltyProgramDto;
import com.demo.tickets.dto.LoyaltyProgramMapper;
import com.demo.tickets.jpa.LoyaltyProgram;
import com.demo.tickets.jpa.LoyaltyProgramRepository;
import jakarta.validation.Valid;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class LoyaltyProgramController {
    private final LoyaltyProgramRepository crudRepository;
    private final LoyaltyProgramMapper mapper;

    public LoyaltyProgramController(LoyaltyProgramRepository crudRepository, LoyaltyProgramMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @MutationMapping(name = "deleteLoyaltyProgram")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull UUID id) {
        LoyaltyProgram entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "loyaltyProgramList")
    @Transactional(readOnly = true)
    @NonNull
    public List<LoyaltyProgramDto> findAll() {
        return crudRepository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @QueryMapping(name = "loyaltyProgram")
    @Transactional(readOnly = true)
    @NonNull
    public LoyaltyProgramDto findById(@GraphQLId @Argument @NonNull UUID id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateLoyaltyProgram")
    @Transactional
    @NonNull
    public LoyaltyProgramDto update(@Argument @NonNull @Valid LoyaltyProgramDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        LoyaltyProgram entity = input.getId() == null
                ? new LoyaltyProgram()
                : crudRepository.findById(input.getId()).orElseThrow();

        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }
}