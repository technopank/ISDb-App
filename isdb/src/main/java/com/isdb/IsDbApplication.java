package com.isdb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("package com.isdb")
public class IsDbApplication {

	public static void main(String[] args) {
		SpringApplication.run(IsDbApplication.class, args);
	}

}
