package site.newkiz.kidsnewsserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.newkiz.kidsnewsserver.Entity.Kidsnews;

public interface KidsnewsRepository extends MongoRepository<Kidsnews, String> {
}
