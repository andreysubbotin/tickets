package com.demo.tickets.mongo;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TicketAuditorAware implements AuditorAware<String> {
    private final AuthenticationInfoProvider authenticationInfoProvider;

    public TicketAuditorAware(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = authenticationInfoProvider.getPreferredUsername();
        return Optional.of(username);
    }
}