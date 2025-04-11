package site.newkiz.recordserver.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.recordserver.entity.NewsSummary;

public interface NewsSummaryRepository extends MongoRepository<NewsSummary, String> {

  List<NewsSummary> findByUserId(String userId);
}
