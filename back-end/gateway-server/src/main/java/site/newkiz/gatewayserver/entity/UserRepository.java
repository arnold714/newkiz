package site.newkiz.gatewayserver.entity;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Integer> {
  Mono<User> findByProviderAndProviderId(String provider, String providerId);
}
