package site.newkiz.gatewayserver.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import site.newkiz.gatewayserver.util.CookieUtil;
import site.newkiz.gatewayserver.util.JwtUtil;

@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

  private final JwtUtil jwtUtil;
  private final CookieUtil cookieUtil;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
    try {
      String accessToken = cookieUtil.getAccessToken(exchange.getRequest());

      if (accessToken != null) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            jwtUtil.getId(accessToken), "", null);

        return chain.filter(exchange)
            .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

    return chain.filter(exchange);
  }
}
