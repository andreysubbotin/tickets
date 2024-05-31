package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.demo.tickets.jpa.LoyaltyProgram;
import com.demo.tickets.jpa.LoyaltyProgramRepository;
import jakarta.validation.Valid;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Controller
public class LoyaltyProgramController {
    private final LoyaltyProgramRepository crudRepository;

    public LoyaltyProgramController(LoyaltyProgramRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @MutationMapping(name = "deleteLoyaltyProgram")
    @Transactional
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    public void delete(@GraphQLId @Argument @NonNull UUID id) {
        LoyaltyProgram entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "loyaltyProgramList")
    @Transactional(readOnly = true)
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    public List<LoyaltyProgram> findAll() {
        return crudRepository.findAll();
    }

    @QueryMapping(name = "loyaltyProgram")
    @Transactional(readOnly = true)
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    public LoyaltyProgram findById(@GraphQLId @Argument @NonNull UUID id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateLoyaltyProgram")
    @Transactional
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    public LoyaltyProgram update(@Argument @NonNull @Valid LoyaltyProgram input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }
}