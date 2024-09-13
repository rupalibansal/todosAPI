package io.nology.toDoApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @SuppressWarnings("null")
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = {
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost",
                "https://todo.bansalz.com",
                "https://todo.bansalz.com/",
                "http://todo.bansalz.com",
                "https://bansalz.com",
                "https://bansalz.com/",
        };
        registry
                .addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("Access-Control-Allow-Origin");
    }
}