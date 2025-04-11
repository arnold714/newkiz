package site.newkiz.gatewayserver.entity;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ProfileRepository extends ReactiveCrudRepository<Profile, Integer> {
  Mono<Profile> findByUserId(Integer userId);
}