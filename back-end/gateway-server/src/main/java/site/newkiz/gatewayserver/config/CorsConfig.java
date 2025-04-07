//package site.newkiz.gatewayserver.config;
//
//import java.util.List;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsWebFilter;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//import org.springframework.web.reactive.config.EnableWebFlux;
//
//@Configuration
//@EnableWebFlux
//public class CorsConfig {
//
//  @Value("${application.domain}")
//  private String domain;
//
//  @Bean
//  public CorsWebFilter corsWebFilter() {
//    CorsConfiguration config = new CorsConfiguration();
//    config.setAllowedOrigins(List.of(domain)); // 허용할 출처
//    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드
//    config.setAllowedHeaders(List.of("*")); // 모든 헤더 허용
//    config.setAllowCredentials(true); // 쿠키 허용
//
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", config); // 모든 경로에 대해 설정 적용
//
//    return new CorsWebFilter(source);
//  }
//}
