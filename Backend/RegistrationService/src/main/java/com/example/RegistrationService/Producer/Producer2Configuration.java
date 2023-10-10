//package com.example.RegistrationService.Producer;
//
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.BindingBuilder;
//import org.springframework.amqp.core.DirectExchange;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class Producer2Configuration {
//    private String exchangeName2 = "data_exchange";
//    private String queueName2 = "my_queue2";
//    @Bean
//    public DirectExchange directExchange1() {
//        return new DirectExchange(exchangeName2);
//    }
//    @Bean
//    public Queue registerQueue1() {
//        return new Queue(queueName2);
//    }
//    @Bean
//    public Binding userBinding1(Queue queue, DirectExchange exchange) {
//        return BindingBuilder.bind(queue).to(exchange).with("my_routing2");
//    }
//    @Bean
//    public RabbitTemplate rabbitTemplate1(ConnectionFactory connectionFactory) {
//        RabbitTemplate template1 = new RabbitTemplate(connectionFactory);
//        template1.setMessageConverter(producerConverter1());
//        return template1;
//    }
//    @Bean
//    public Jackson2JsonMessageConverter producerConverter1() {
//        return new Jackson2JsonMessageConverter();
//    }
//}
