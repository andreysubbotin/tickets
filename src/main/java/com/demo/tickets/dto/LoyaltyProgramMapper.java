package com.demo.tickets.dto;

import com.demo.tickets.jpa.LoyaltyProgram;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface LoyaltyProgramMapper {
    LoyaltyProgram toEntity(LoyaltyProgramDto loyaltyProgramDto);

    LoyaltyProgramDto toDto(LoyaltyProgram loyaltyProgram);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    LoyaltyProgram partialUpdate(LoyaltyProgramDto loyaltyProgramDto, @MappingTarget LoyaltyProgram loyaltyProgram);
}