package site.newkiz.gatewayserver.util;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import site.newkiz.gatewayserver.util.JwtUtil.TokenType;

@Component
@RequiredArgsConstructor
public class CookieUtil {

  private final JwtUtil jwtUtil;

  public void addCookie(ServerHttpResponse response, String name, String value, long maxAge) {
    ResponseCookie cookie = ResponseCookie.from(name, value)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(maxAge)
        .build();

    response.addCookie(cookie);
  }

  public void addAccessTokenCookie(ServerHttpResponse response, String token) {
    addCookie(response, TokenType.ACCESS.toString(), token, jwtUtil.getACCESS_TOKEN_EXPIRE_TIME());
  }

  public void addRefreshTokenCookie(ServerHttpResponse response, String token) {
    addCookie(response, TokenType.REFRESH.toString(), token, jwtUtil.getREFRESH_TOKEN_EXPIRE_TIME());
  }

  public void removeCookie(ServerHttpResponse response, String name) {
    addCookie(response, name, null, 0);
  }
}
