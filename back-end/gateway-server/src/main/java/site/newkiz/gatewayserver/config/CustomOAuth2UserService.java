package site.newkiz.gatewayserver.config;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultReactiveOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import site.newkiz.gatewayserver.entity.User;
import site.newkiz.gatewayserver.entity.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultReactiveOAuth2UserService {

  private final UserRepository userRepository;

  @Override
  public Mono<OAuth2User> loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    return super.loadUser(userRequest)
        .flatMap(oAuth2User -> {
          // 1. OAuth2 제공자 정보 추출
          String provider = userRequest.getClientRegistration().getRegistrationId();

          // 2. 카카오 사용자 정보 파싱
          Map<String, Object> attributes = oAuth2User.getAttributes();
          Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
          Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

          // 3. 필수 정보 추출
          String providerId = attributes.get("id").toString();
          String email = (String) kakaoAccount.get("email");
          String name = (String) profile.get("nickname");

          // 5. DB 조회 및 저장
          return userRepository.findByProviderAndProviderId(provider, providerId)
              .switchIfEmpty(userRepository.save(new User(provider, providerId, name, email)))
              .map(user -> new CustomOAuth2User(user, attributes));
        });
  }
}