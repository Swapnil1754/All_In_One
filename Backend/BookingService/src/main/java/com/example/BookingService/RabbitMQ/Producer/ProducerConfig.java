//package com.example.BookingService.RabbitMQ.Producer;
//
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.BindingBuilder;
//import org.springframework.amqp.core.DirectExchange;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
//import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class ProducerConfig {
//
////    private String exchangeName = "data_exchanger";
////    private String queName = "que_notifier";
////
////    @Bean
////    public DirectExchange directExchange() {
////        return new DirectExchange(exchangeName);
////    }
//
////    @Bean
////    public Queue registerQue() {
////        return new Queue(queName);
////    }
////
////    @Bean
////    public Binding userBinding(Queue queue, DirectExchange exchange) {
////        return BindingBuilder.bind(queue).to(exchange).with("notify_message");
////    }
////
////    @Bean
////    public Jackson2JsonMessageConverter produceConverter() {
////        return new Jackson2JsonMessageConverter();
////    }
////
////    @Bean
////    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
////        RabbitTemplate template = new RabbitTemplate(connectionFactory);
////        template.setMessageConverter(produceConverter());
////        return template;
////    }
////    @Bean
////    public Queue notificationQue() {
////        return new Queue("que_notifier");
////    }
////    @Bean
////    public MessageConverter jsonMessageConverter() {
////        return new Jackson2JsonMessageConverter();
////    }
////    @Bean
////    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
////        RabbitTemplate template = new RabbitTemplate(connectionFactory);
////        template.setMessageConverter(jsonMessageConverter());
////        return template;
////    }
////    @Bean
////    public SimpleMessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory, MessageListenerAdapter adapter) {
////        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
////        container.setConnectionFactory(connectionFactory);
////        container.setQueues(notificationQue());
//////        container.setMessageAckListener(adapter);
////        return container;
////    }
////    @Bean
////    public MessageListenerAdapter listenerAdapter(NotificationS) {
////        MessageListenerAdapter adapter = new MessageListenerAdapter();
////    }
//}
