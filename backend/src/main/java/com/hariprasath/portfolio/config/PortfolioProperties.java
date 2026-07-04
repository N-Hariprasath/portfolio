package com.hariprasath.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "portfolio")
@Getter
@Setter
public class PortfolioProperties {
    private String uploadDir;
    private String[] corsAllowedOrigins;
}
