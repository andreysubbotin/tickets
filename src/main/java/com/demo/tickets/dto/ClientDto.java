package com.demo.tickets.dto;

import com.demo.tickets.jpa.Client;
import com.demo.tickets.jpa.Gender;
import com.demo.tickets.jpa.LoyaltyProgram;
import jakarta.validation.constraints.Email;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * DTO for {@link Client}
 */
public class ClientDto implements Serializable {
    private UUID id;
    private String firstName;
    private String lastName;
    private LoyaltyProgram loyaltyProgram;
    private Gender gender;
    @Email
    private String email;

    public ClientDto() {
    }

    public ClientDto(UUID id, String firstName, String lastName, LoyaltyProgram loyaltyProgram, Gender gender,
                     String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.loyaltyProgram = loyaltyProgram;
        this.gender = gender;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public LoyaltyProgram getLoyaltyProgram() {
        return loyaltyProgram;
    }

    public void setLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        this.loyaltyProgram = loyaltyProgram;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}