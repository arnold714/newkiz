package site.newkiz.mypageserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.mypageserver.entity.NewsDocument;

public interface NewsRepository extends MongoRepository<NewsDocument, String> {

}
