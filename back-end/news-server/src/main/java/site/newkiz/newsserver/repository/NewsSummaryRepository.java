package site.newkiz.newsserver.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entitiy.NewsSummary;

public interface NewsSummaryRepository extends MongoRepository<NewsSummary, String> {
  Optional<NewsSummary> findByNewsIdAndUserId(String newsId, String userId);
}
