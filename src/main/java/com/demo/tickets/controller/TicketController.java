package com.demo.tickets.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.demo.tickets.MinioService;
import com.demo.tickets.dto.TicketDto;
import com.demo.tickets.dto.TicketMapper;
import com.demo.tickets.mongo.Ticket;
import com.demo.tickets.mongo.TicketRepository;
import com.demo.tickets.service.TicketService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
public class TicketController {
    private final TicketRepository crudRepository;
    private final TicketMapper mapper;

    private final TicketService ticketService;

    private final String bucketName;

    private final MinioService minioService;

    public TicketController(TicketRepository crudRepository, TicketMapper mapper,
                            TicketService ticketService,
                            @Value("${minio.bucket.ticket.receipt}") String bucketName,
                            MinioService minioService) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
        this.ticketService = ticketService;
        this.bucketName = bucketName;
        this.minioService = minioService;
    }

    @NonNull
    @QueryMapping(name = "ticketList")
    public ResultPage<TicketDto> findAll(
            @Argument OffsetPageInput page,
            @Argument List<TicketOrderByInput> sort,
            @Argument TicketFilter filter
    ) {
        Pageable pageable = Optional.ofNullable(page)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sort)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sort)));
        Page<Ticket> result = crudRepository.findAll(pageable);
        return ResultPage.page(result.map(mapper::toDto).getContent(), result.getTotalElements());
    }

    @MutationMapping(name = "deleteTicket")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull String id) {
        Ticket entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "ticket")
    @Transactional(readOnly = true)
    @NonNull
    public TicketDto findById(@GraphQLId @Argument @NonNull String id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @Secured("ROLE_BOOKER")
    @MutationMapping(name = "bookTicket")
    public void bookTicket(@Argument @NotNull @GraphQLId Long flightId, @Argument @NotNull @GraphQLId UUID clientId) {
        ticketService.bookTicket(flightId, clientId);
    }

    @NonNull
    @QueryMapping(name = "ticketReceiptDownloadUrl")
    public URL getTicketReceiptDownloadUrl(@Argument @NonNull @GraphQLId String id) {
        Ticket ticket = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found by id: " + id));
        String fileId = ticket.getReceipt();
        if (fileId == null) {
            throw new RuntimeException("File id is not set for entity: " + id);
        }
        return minioService.getPreSignedDownloadUrl(bucketName, fileId);
    }

    protected Sort createSort(List<TicketOrderByInput> sortInput) {
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
                        case PRICE:
                            return Sort.Order.by("price").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class TicketOrderByInput {
        private TicketOrderByProperty property;
        private SortDirection direction;

        public TicketOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(TicketOrderByProperty property) {
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

    public enum TicketOrderByProperty {
        PRICE
    }

    static class TicketFilter {
        private UUID clientId;

        public UUID getClientId() {
            return clientId;
        }

        public void setClientId(UUID clientId) {
            this.clientId = clientId;
        }
    }
}