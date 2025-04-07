package site.newkiz.gatewayserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import site.newkiz.gatewayserver.entity.ProfileRepository;
import site.newkiz.gatewayserver.entity.UserRepository;
import site.newkiz.gatewayserver.filter.JwtAuthenticationFilter;
import site.newkiz.gatewayserver.util.CookieUtil;
import site.newkiz.gatewayserver.util.JwtUtil;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final ApplicationConfig applicationConfig;
  private final JwtUtil jwtUtil;
  private final CookieUtil cookieUtil;
  private final UserRepository userRepository;
  private final ProfileRepository profileRepository;

  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
    return http
        .csrf(ServerHttpSecurity.CsrfSpec::disable)
        .cors(cors -> {})
        .authorizeExchange(exchanges -> exchanges
            .pathMatchers("/", "/oauth2/**", "/api/auth/**", "/ws/**").permitAll()
            .anyExchange().authenticated()
        )
        .oauth2Login(oauth2 -> oauth2
            .authenticationSuccessHandler(
                new CustomAuthenticationSuccessHandler(applicationConfig, jwtUtil, cookieUtil,
                    userRepository, profileRepository))
        )
        .addFilterAt(
            new JwtAuthenticationFilter(applicationConfig, jwtUtil, cookieUtil, profileRepository),
            SecurityWebFiltersOrder.AUTHENTICATION)
        .build();
  }
}
