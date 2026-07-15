package com.hariprasath.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@SpringBootApplication
public class PortfolioApplication {

	public static void main(String[] args) {
		String[] passwords = {"1234", "", "root", "admin", "mysql", "password", "123456", "12345678"};
		String url = "jdbc:mysql://localhost:3306/?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
		String username = "root";
		boolean success = false;
		
		System.out.println("=== STARTING DATABASE CONNECTION TEST ===");
		for (String pwd : passwords) {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				try (Connection conn = DriverManager.getConnection(url, username, pwd)) {
					System.out.println(">>> SUCCESS: Connected successfully with password: \"" + pwd + "\"");
					success = true;
					break;
				}
			} catch (ClassNotFoundException e) {
				System.err.println("Driver not found: " + e.getMessage());
				break;
			} catch (SQLException e) {
				System.out.println("FAILED: Password \"" + pwd + "\" - Error: " + e.getMessage());
			}
		}
		System.out.println("=== END OF DATABASE CONNECTION TEST ===");
		
		if (!success) {
			System.err.println(">>> ERROR: Could not connect to MySQL with any common password. Please ensure MySQL is running on port 3306.");
		}

		SpringApplication.run(PortfolioApplication.class, args);
	}

}
