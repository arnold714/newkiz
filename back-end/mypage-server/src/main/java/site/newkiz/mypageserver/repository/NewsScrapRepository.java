package site.newkiz.mypageserver.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.mypageserver.entity.NewsScrap;

public interface NewsScrapRepository extends MongoRepository<NewsScrap, String> {

  List<NewsScrap> findAllByUserId(String userId);
}

