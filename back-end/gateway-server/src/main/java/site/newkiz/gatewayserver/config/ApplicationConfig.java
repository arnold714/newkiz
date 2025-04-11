package site.newkiz.gatewayserver.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ApplicationConfig {

  @Value("${application.domain}")
  private String domain;

}
