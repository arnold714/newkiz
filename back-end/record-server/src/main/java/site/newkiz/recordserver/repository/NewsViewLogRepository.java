package site.newkiz.recordserver.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.recordserver.entity.NewsViewLog;

public interface NewsViewLogRepository extends MongoRepository<NewsViewLog, String> {

  List<NewsViewLog> findByUserId(String userId);

  Integer countByUserIdAndViewedAtAfter(String userId, LocalDateTime startOfDay);
}