package site.newkiz.newsserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entity.NewsViewLog;

public interface NewsViewLogRepository extends MongoRepository<NewsViewLog, String> {

  boolean existsByUserIdAndNewsId(String userId, String newsId);
}