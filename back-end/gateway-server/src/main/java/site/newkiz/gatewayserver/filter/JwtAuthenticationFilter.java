package site.newkiz.gatewayserver.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import site.newkiz.gatewayserver.config.ApplicationConfig;
import site.newkiz.gatewayserver.entity.ProfileRepository;
import site.newkiz.gatewayserver.util.CookieUtil;
import site.newkiz.gatewayserver.util.JwtUtil;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter implements WebFilter {

  private final ApplicationConfig applicationConfig;
  private final JwtUtil jwtUtil;
  private final CookieUtil cookieUtil;
  private final ProfileRepository profileRepository;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    try {
      String accessToken = cookieUtil.getAccessToken(exchange.getRequest());
      String refreshToken = cookieUtil.getRefreshToken(exchange.getRequest());

      log.info("First enter");
      log.info(exchange.getRequest().getURI().getPath());
      log.info(exchange.getRequest().getMethod().name());

      if (accessToken != null || refreshToken != null) {
        if(refreshToken != null) {
          Integer userId = jwtUtil.getId(refreshToken);
          String name = jwtUtil.getName(refreshToken);

          String newAccessToken = jwtUtil.createAccessToken(userId, name);
          String newRefreshToken = jwtUtil.createRefreshToken(userId, name);

          cookieUtil.addAccessTokenCookie(exchange.getResponse(), newAccessToken);
          cookieUtil.addRefreshTokenCookie(exchange.getResponse(), newRefreshToken);
        }

        Integer userId = jwtUtil.getId(accessToken != null ? accessToken : refreshToken);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userId, "", null);

        return profileRepository.findByUserId(userId)
            .flatMap(profile -> {
              ServerWebExchange mutatedExchange = exchange.mutate()
                  .request(exchange.getRequest().mutate()
                      .header("User-Id", String.valueOf(userId))
                      .build())
                  .build();
              return chain.filter(mutatedExchange)
                  .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
            })
            .switchIfEmpty(Mono.defer(() -> {
              if (exchange.getRequest().getURI().getPath().startsWith("/api/mypage")) {
                ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(exchange.getRequest().mutate()
                        .header("User-Id", String.valueOf(userId))
                        .build())
                    .build();
                return chain.filter(mutatedExchange)
                    .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
              } else {
                return redirectToProfileSetup(exchange.getResponse());
              }
            }));
      }

    } catch (Exception e) {
      throw new RuntimeException(e);
    }

    return chain.filter(exchange);
  }

  private Mono<Void> redirectToProfileSetup(ServerHttpResponse response) {
    if (!response.isCommitted()) {
      response.setStatusCode(HttpStatus.SEE_OTHER);
      response.getHeaders()
          .add("Location", applicationConfig.getDomain() + "/userinfo");
    }
    return response.setComplete();
  }
}
