package com.demo.tickets.dto;

import jakarta.validation.constraints.Positive;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

/**
 * DTO for {@link com.demo.tickets.jpa.LoyaltyProgram}
 */
public class LoyaltyProgramDto implements Serializable {
    private final UUID id;
    private final String name;
    @Positive
    private final BigDecimal discountPercent;

    public LoyaltyProgramDto(UUID id, String name, BigDecimal discountPercent) {
        this.id = id;
        this.name = name;
        this.discountPercent = discountPercent;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getDiscountPercent() {
        return discountPercent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoyaltyProgramDto entity = (LoyaltyProgramDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.name, entity.name) &&
                Objects.equals(this.discountPercent, entity.discountPercent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, discountPercent);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "name = " + name + ", " +
                "discountPercent = " + discountPercent + ")";
    }
}