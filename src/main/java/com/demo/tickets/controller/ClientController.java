package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.demo.tickets.dto.ClientDto;
import com.demo.tickets.dto.ClientMapper;
import com.demo.tickets.jpa.Client;
import com.demo.tickets.jpa.ClientRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    public void delete(@GraphQLId @Argument @NonNull UUID id) {
        Client entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "clientList")
    @Transactional(readOnly = true)
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    public List<ClientDto> findAll(
            @Argument ClientFilter filter,
            @Argument("sort") List<ClientOrderByInput> sortInput
    ) {
        Specification<Client> specification = createFilter(filter);
        Sort sort = createSort(sortInput);
        return crudRepository.findAll(specification, sort).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @QueryMapping(name = "client")
    @Transactional(readOnly = true)
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
    @NonNull
    public ClientDto findById(@GraphQLId @Argument @NonNull UUID id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateClient")
    @Transactional
    @Secured({"ROLE_BOOKER", "ROLE_VIEWER"})
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

    protected Sort createSort(List<ClientOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case FIRST_NAME:
                            return Sort.Order.by("firstName").with(direction);
                        case LAST_NAME:
                            return Sort.Order.by("lastName").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class ClientOrderByInput {
        private ClientOrderByProperty property;
        private SortDirection direction;

        public ClientOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(ClientOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {
        ASC,
        DESC
    }

    public enum ClientOrderByProperty {
        FIRST_NAME,
        LAST_NAME
    }

    protected Specification<Client> createFilter(ClientFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.firstName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + filter.firstName.toLowerCase() + "%"));
                }
                if (filter.lastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + filter.lastName.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class ClientFilter {
        private String firstName;
        private String lastName;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
    }
}