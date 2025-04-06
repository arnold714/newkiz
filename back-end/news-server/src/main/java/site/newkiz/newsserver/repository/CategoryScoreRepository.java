package site.newkiz.newsserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entity.CategoryScore;

public interface CategoryScoreRepository extends MongoRepository<CategoryScore, String> {

}
