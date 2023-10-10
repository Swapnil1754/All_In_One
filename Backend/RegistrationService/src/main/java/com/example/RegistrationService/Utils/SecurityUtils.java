//package com.example.RegistrationService.Utils;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.userdetails.UserDetails;
//import reactor.core.publisher.Mono;
//import org.springframework.security.core.context.ReactiveSecurityContextHolder;
//
//public class SecurityUtils {
//    public SecurityUtils() {
//    }
//    public static Mono<String> getCurrentUserLogin() {
//        return ReactiveSecurityContextHolder
//                .getContext()
//                .map(SecurityContext::getAuthentication)
//                .flatMap(authentication -> Mono.justOrEmpty(extractPrincipal(authentication)));
//    }
//    private static String extractPrincipal(Authentication authentication) {
//        if (authentication == null) {
//            return null;
//        } else if (authentication.getPrincipal() instanceof UserDetails) {
//            UserDetails userDetails = (UserDetails) authentication.getDetails();
//            return userDetails.getUsername();
//        } else if (authentication.getPrincipal() instanceof String) {
//            return (String) authentication.getPrincipal();
//        }
//        return null;
//    }
//}
