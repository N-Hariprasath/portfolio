package com.hariprasath.portfolio.service;

import com.hariprasath.portfolio.entity.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${portfolio.contact-recipient-email}")
    private String recipientEmail;

    public void sendContactNotification(ContactMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(senderEmail);
            mail.setTo(recipientEmail);
            mail.setReplyTo(message.getEmail());
            mail.setSubject("New Portfolio Message from " + message.getName() + ": " + message.getSubject());
            
            String body = "You have received a new contact message from your portfolio website:\n\n" +
                          "Name: " + message.getName() + "\n" +
                          "Email: " + message.getEmail() + "\n" +
                          "Subject: " + message.getSubject() + "\n\n" +
                          "Message:\n" + message.getMessage() + "\n";
            
            mail.setText(body);
            mailSender.send(mail);
            log.info("Contact notification email sent successfully to {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send contact notification email", e);
        }
    }
}
