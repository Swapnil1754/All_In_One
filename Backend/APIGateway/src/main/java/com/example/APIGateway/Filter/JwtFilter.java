package com.example.APIGateway.Filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final String authHeader = request.getHeader("Authorization");
        if ("OPTIONS".equals(request.getMethod())) {
            System.out.println("1");
            response.setStatus(HttpServletResponse.SC_OK);
            System.out.println("2");
            filterChain.doFilter(request,response);
        } else {
            if (authHeader == null || !authHeader.startsWith("Bearer")) {
                System.out.println("auth : "+authHeader);
                throw new ServletException("Missing or Invalid Authorization header...!!!");
            }
            final String token = authHeader.substring(7);
            final Claims claims = Jwts.parser().setSigningKey("secretekey").parseClaimsJws(token).getBody();
            request.setAttribute("claims", claims);
            System.out.println("3");
            filterChain.doFilter(request, response);
        }
    }
}
