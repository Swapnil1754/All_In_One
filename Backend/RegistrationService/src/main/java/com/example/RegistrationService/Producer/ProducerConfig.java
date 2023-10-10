package com.example.RegistrationService.Producer;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
@Primary
public class ProducerConfig {
    private String exchangeName = "data_exchange";
    private String exchangeName2 = "data_exchange2";
    private String queueName = "my_queue";
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(exchangeName);
    }
    @Bean
    public Queue registerQueue() {
        return new Queue(queueName);
    }
    @Bean
    public Binding userBinding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("my_routing");
    }
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(producerConverter());
        return template;
    }
    @Bean
    public Jackson2JsonMessageConverter producerConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
