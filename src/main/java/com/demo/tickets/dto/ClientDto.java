package com.demo.tickets.dto;

import com.demo.tickets.jpa.Gender;
import com.demo.tickets.jpa.LoyaltyProgram;
import jakarta.validation.constraints.Email;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * DTO for {@link com.demo.tickets.jpa.Client}
 */
public class ClientDto implements Serializable {
    private UUID id;
    private String firstName;
    private String lastName;
    @Email
    private String email;
    private Gender gender;
    private LoyaltyProgram loyaltyProgram;

    public ClientDto() {
    }

    public ClientDto(UUID id, String firstName, String lastName, String email, Gender gender, LoyaltyProgram loyaltyProgram) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.loyaltyProgram = loyaltyProgram;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LoyaltyProgram getLoyaltyProgram() {
        return loyaltyProgram;
    }

    public void setLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        this.loyaltyProgram = loyaltyProgram;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientDto entity = (ClientDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.firstName, entity.firstName) &&
                Objects.equals(this.lastName, entity.lastName) &&
                Objects.equals(this.email, entity.email) &&
                Objects.equals(this.gender, entity.gender) &&
                Objects.equals(this.loyaltyProgram, entity.loyaltyProgram);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, gender, loyaltyProgram);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "firstName = " + firstName + ", " +
                "lastName = " + lastName + ", " +
                "email = " + email + ", " +
                "gender = " + gender + ", " +
                "loyaltyProgram = " + loyaltyProgram + ")";
    }
}