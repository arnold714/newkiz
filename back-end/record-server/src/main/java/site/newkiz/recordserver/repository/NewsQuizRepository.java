package site.newkiz.recordserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.recordserver.entity.NewsQuizDocument;

public interface NewsQuizRepository extends MongoRepository<NewsQuizDocument, String> {

}
