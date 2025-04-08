package site.newkiz.newsserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entity.NewsViewLog;

public interface NewsViewLogRepository extends MongoRepository<NewsViewLog, String> {

  NewsViewLog findByUserIdAndNewsId(String userId, String newsId);
}