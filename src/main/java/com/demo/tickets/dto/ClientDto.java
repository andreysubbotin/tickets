package com.demo.tickets.dto;

import com.demo.tickets.jpa.Gender;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * DTO for {@link com.demo.tickets.jpa.Client}
 */
public class ClientDto implements Serializable {
    private final UUID id;
    private final String firstName;
    private final String lastName;
    private final LoyaltyProgramDto loyaltyProgram;
    private final Gender gender;

    public ClientDto(UUID id, String firstName, String lastName, LoyaltyProgramDto loyaltyProgram, Gender gender) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.loyaltyProgram = loyaltyProgram;
        this.gender = gender;
    }

    public UUID getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LoyaltyProgramDto getLoyaltyProgram() {
        return loyaltyProgram;
    }

    public Gender getGender() {
        return gender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientDto entity = (ClientDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.firstName, entity.firstName) &&
                Objects.equals(this.lastName, entity.lastName) &&
                Objects.equals(this.loyaltyProgram, entity.loyaltyProgram) &&
                Objects.equals(this.gender, entity.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, loyaltyProgram, gender);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "firstName = " + firstName + ", " +
                "lastName = " + lastName + ", " +
                "loyaltyProgram = " + loyaltyProgram + ", " +
                "gender = " + gender + ")";
    }
}