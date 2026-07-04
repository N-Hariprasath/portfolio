package com.hariprasath.portfolio.repository;

import com.hariprasath.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
