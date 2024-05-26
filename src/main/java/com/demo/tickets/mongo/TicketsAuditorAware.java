package com.demo.tickets.mongo;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TicketsAuditorAware implements AuditorAware<String> {
    private final AuthenticationInfoProvider authenticationInfoProvider;

    public TicketsAuditorAware(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = authenticationInfoProvider.getPreferredUsername();
        return Optional.ofNullable(username);
    }
}