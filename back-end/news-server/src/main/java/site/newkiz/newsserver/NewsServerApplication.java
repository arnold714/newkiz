package site.newkiz.newsserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class NewsServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewsServerApplication.class, args);
	}

}
