package com.demo.tickets.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, UUID> {
}