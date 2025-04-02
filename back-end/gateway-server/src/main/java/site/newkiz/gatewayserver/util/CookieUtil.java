package site.newkiz.gatewayserver.util;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import site.newkiz.gatewayserver.entity.enums.TokenType;

@Component
@RequiredArgsConstructor
public class CookieUtil {

  private final JwtUtil jwtUtil;

  public void addCookie(ServerHttpResponse response, String name, String value, long maxAge) {
    ResponseCookie cookie = ResponseCookie.from(name, value)
        .domain(".newkiz.site")
        .httpOnly(true)
        .sameSite("None")
        .secure(true)
        .path("/")
        .maxAge(maxAge)
        .build();

    response.addCookie(cookie);
  }

  public void addAccessTokenCookie(ServerHttpResponse response, String token) {
    addCookie(response, TokenType.ACCESS_TOKEN.toString(), token, jwtUtil.getACCESS_TOKEN_EXPIRE_TIME());
  }

  public void addRefreshTokenCookie(ServerHttpResponse response, String token) {
    addCookie(response, TokenType.REFRESH_TOKEN.toString(), token, jwtUtil.getREFRESH_TOKEN_EXPIRE_TIME());
  }

  public void removeCookie(ServerHttpResponse response, String name) {
    addCookie(response, name, null, 0);
  }

  public String getAccessToken(ServerHttpRequest request) {
    var cookies = request.getCookies();
    if (cookies.containsKey(TokenType.ACCESS_TOKEN.toString())) {
      return Objects.requireNonNull(cookies.getFirst(TokenType.ACCESS_TOKEN.toString())).getValue();
    }
    return null;
  }

  public String getRefreshToken(ServerHttpRequest request) {
    var cookies = request.getCookies();
    if (cookies.containsKey(TokenType.REFRESH_TOKEN.toString())) {
      return Objects.requireNonNull(cookies.getFirst(TokenType.REFRESH_TOKEN.toString())).getValue();
    }
    return null;
  }
}
