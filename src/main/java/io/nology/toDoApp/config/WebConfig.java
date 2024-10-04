package io.nology.toDoApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @SuppressWarnings("null")
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = {
                "http://localhost",
                "http://localhost:5173",
                "https://todo.bansalz.com",
                "http://todo.bansalz.com"
        };
        registry
                .addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "PATCH", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}