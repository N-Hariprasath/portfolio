package com.hariprasath.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.io.File;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final PortfolioProperties portfolioProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose the upload folder physically to serve images & resumes
        File file = new File(portfolioProperties.getUploadDir());
        String absolutePath = file.getAbsolutePath();
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + absolutePath + File.separator);
        
        // Expose root workspace files to be served directly
        registry.addResourceHandler("/me.jpeg")
                .addResourceLocations("file:./me.jpeg", "file:../me.jpeg");
        registry.addResourceHandler("/resumes.pdf")
                .addResourceLocations("file:./resumes.pdf", "file:../resumes.pdf");
    }
}
