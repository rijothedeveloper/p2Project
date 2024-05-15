package com.revature.p2Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.revature.models") //This is telling Spring to look for DB entities here
@ComponentScan("com.revature") //Spring will look for Beans within com.revature (and its subpackages)
@EnableJpaRepositories("com.revature.daos")
@SpringBootApplication
public class P2BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(P2BackendApplication.class, args);
	}

}