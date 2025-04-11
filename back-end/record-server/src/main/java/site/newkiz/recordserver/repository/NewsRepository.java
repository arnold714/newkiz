package site.newkiz.recordserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.recordserver.entity.NewsDocument;

public interface NewsRepository extends MongoRepository<NewsDocument, String> {

}
