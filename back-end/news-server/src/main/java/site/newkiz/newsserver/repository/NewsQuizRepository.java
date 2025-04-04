package site.newkiz.newsserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.newsserver.entity.NewsQuizDocument;

public interface NewsQuizRepository extends MongoRepository<NewsQuizDocument, String> {

}
