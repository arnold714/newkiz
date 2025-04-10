package site.newkiz.gatewayserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import site.newkiz.gatewayserver.util.CookieUtil;
import site.newkiz.gatewayserver.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final JwtUtil jwtUtil;
  private final CookieUtil cookieUtil;

  @PostMapping("/refresh")
  public Mono<Void> refreshToken(ServerHttpRequest request, ServerHttpResponse response) {
    String refreshToken = cookieUtil.getRefreshToken(request);

    System.out.println(refreshToken);

    if (refreshToken == null) {
      response.setStatusCode(HttpStatus.UNAUTHORIZED);
      return response.setComplete(); // 응답을 완료하고 아무것도 반환하지 않음
    }

    Integer userId = jwtUtil.getId(refreshToken);
    String name = jwtUtil.getName(refreshToken);

    String newAccessToken = jwtUtil.createAccessToken(userId, name);
    String newRefreshToken = jwtUtil.createRefreshToken(userId, name);

    cookieUtil.addAccessTokenCookie(response, newAccessToken);
    cookieUtil.addRefreshTokenCookie(response, newRefreshToken);

    return response.setComplete();
  }
}
