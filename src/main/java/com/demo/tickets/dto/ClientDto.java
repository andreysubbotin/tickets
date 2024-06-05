package com.demo.tickets.dto;

import com.demo.tickets.jpa.Gender;
import jakarta.validation.constraints.Email;

import java.io.Serializable;
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

    public ClientDto() {
    }

    public ClientDto(UUID id, String firstName, String lastName, String email, Gender gender) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
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
}