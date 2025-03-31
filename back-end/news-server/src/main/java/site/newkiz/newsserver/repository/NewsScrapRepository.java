package site.newkiz.newsserver.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entitiy.NewsScrap;

public interface NewsScrapRepository extends MongoRepository<NewsScrap, String> {

  Boolean existsByUserIdAndNewsId(String userId, String newsId);

  Optional<Void> deleteByUserIdAndNewsId(String userId, String newsId);
}

