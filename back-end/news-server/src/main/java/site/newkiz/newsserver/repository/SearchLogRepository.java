package site.newkiz.newsserver.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import site.newkiz.newsserver.entity.SearchLog;

public interface SearchLogRepository extends MongoRepository<SearchLog, String> {

  Optional<SearchLog> findByKeyword(String keyword);

  @Query(value = "{ 'userId': ?0 }", sort = "{ 'searchedAt': -1 }")
  List<SearchLog> findTop5ByUserIdOrderBySearchedAtDesc(String userId);


  void deleteById(String id);

}