package site.newkiz.gatewayserver.config;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import site.newkiz.gatewayserver.entity.ProfileRepository;
import site.newkiz.gatewayserver.entity.UserRepository;
import site.newkiz.gatewayserver.util.CookieUtil;
import site.newkiz.gatewayserver.util.JwtUtil;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements ServerAuthenticationSuccessHandler {

  private final ApplicationConfig applicationConfig;
  private final JwtUtil jwtUtil;
  private final CookieUtil cookieUtil;
  private final UserRepository userRepository;
  private final ProfileRepository profileRepository;


  @Override
  public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {

    ServerWebExchange exchange = webFilterExchange.getExchange();
    ServerHttpResponse response = exchange.getResponse();

    // 1. 인증 정보에서 사용자 추출
    CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

    // 2. 유저 정보 조회
    return userRepository.findByProviderAndProviderId(oAuth2User.getUser().getProvider(), oAuth2User.getUser().getProviderId())
        .flatMap(user -> {
          // 3. JWT 토큰 생성
          String accessToken = jwtUtil.createAccessToken(user.getId(), user.getName());
          String refreshToken = jwtUtil.createRefreshToken(user.getId(), user.getName());

          // 4. 쿠키 설정
          cookieUtil.addAccessTokenCookie(response, accessToken);
          cookieUtil.addRefreshTokenCookie(response, refreshToken);

          // 5. 프로필 존재 여부 확인 후 리다이렉트 결정
          return profileRepository.findByUserId(user.getId())
              .map(profile -> "http://" + applicationConfig.getDomain()) // 프로필이 존재하면 메인 페이지로
              .defaultIfEmpty("http://" + applicationConfig.getDomain() + "/userinfo") // 없으면 유저 정보 입력 페이지로
              .flatMap(redirectUrl -> {
                response.setStatusCode(HttpStatus.SEE_OTHER);
                response.getHeaders().setLocation(URI.create(redirectUrl));
                return response.setComplete();
              });
        });
  }
}
