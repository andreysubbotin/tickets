package com.demo.tickets.config;

import com.demo.notifications.TicketConfirmationMessage;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.UUIDDeserializer;
import org.apache.kafka.common.serialization.UUIDSerializer;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.Map;
import java.util.UUID;

@Configuration
public class KafkaConfiguration {

    @Bean
    DefaultKafkaProducerFactory<UUID, TicketConfirmationMessage> ticketConfirmationMessageProducerFactory(KafkaProperties properties) {
        Map<String, Object> producerProperties = properties.buildProducerProperties(null);
        producerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, UUIDSerializer.class);
        producerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(producerProperties);
    }

    @Bean
    KafkaTemplate<UUID, TicketConfirmationMessage> ticketConfirmationMessageKafkaTemplate(DefaultKafkaProducerFactory<UUID, TicketConfirmationMessage> ticketConfirmationMessageProducerFactory) {
        return new KafkaTemplate<>(ticketConfirmationMessageProducerFactory);
    }

    @Bean
    public ConsumerFactory<UUID, TicketConfirmationMessage> ticketConfirmationMessageConsumerFactory(KafkaProperties kafkaProperties) {
        Map<String, Object> props = kafkaProperties.buildConsumerProperties(null);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, UUIDDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "com.demo.notifications");
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public KafkaListenerContainerFactory<?> ticketConfirmationMessageListenerFactory(ConsumerFactory<UUID, TicketConfirmationMessage> ticketConfirmationMessageConsumerFactory) {
        ConcurrentKafkaListenerContainerFactory<UUID, TicketConfirmationMessage> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(ticketConfirmationMessageConsumerFactory);
        factory.setBatchListener(false);
        return factory;
    }
}