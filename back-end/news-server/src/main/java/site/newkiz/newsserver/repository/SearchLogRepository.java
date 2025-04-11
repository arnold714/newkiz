package site.newkiz.newsserver.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import site.newkiz.newsserver.entity.SearchLog;

public interface SearchLogRepository extends MongoRepository<SearchLog, String> {

  Optional<SearchLog> findByUserIdAndKeyword(String userId, String keyword);

  @Query(value = "{ 'userId': ?0 }", sort = "{ 'searchedAt': -1 }")
  List<SearchLog> findTop5ByUserIdOrderBySearchedAtDesc(String userId);

  void deleteById(String id);

  @Aggregation(pipeline = {
      "{ '$match': { 'searchedAt': { '$gte': ?0 } } }",
      "{ '$group': { '_id': '$keyword', 'count': { '$sum': 1 } } }",
      "{ '$sort': { 'count': -1 } }",
      "{ '$limit': 10 }"
  })
  List<KeywordCount> findTop10MostSearchedKeywordsWithin24Hours(LocalDateTime from);

  interface KeywordCount {

    String get_id(); // keyword

    int getCount();  // 검색 횟수
  }
}