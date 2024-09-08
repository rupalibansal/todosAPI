package io.nology.toDoApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @SuppressWarnings("null")
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = { "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost",
                "http://127.0.0.1", "http://localhost:80",
                "http://ec2-3-24-134-69.ap-southeast-2.compute.amazonaws.com" };
        registry
                .addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}