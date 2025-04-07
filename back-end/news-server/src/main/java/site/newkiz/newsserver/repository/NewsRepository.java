package site.newkiz.newsserver.repository;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import site.newkiz.newsserver.entity.NewsDocument;

public interface NewsRepository extends MongoRepository<NewsDocument, String> {

  @Query("{ '_id': { '$lt': ?0 } }")
  List<NewsDocument> findNewsByCursor(ObjectId cursor, Pageable pageable);

  List<NewsDocument> findTop20ByOrderByIdDesc();

  // 커서 + 카테고리 기반 조회
  @Query("{ 'category': ?0, '_id': { '$lt': ?1 } }")
  List<NewsDocument> findNewsByCategoryAndCursor(String category, ObjectId cursor,
      Pageable pageable);

  // 카테고리만으로 최신순 20개 (커서 없이)
  List<NewsDocument> findTop20ByCategoryOrderByIdDesc(String category);

  // 커서 + 카테고리 기반 조회
  @Query("{ 'sub_category': ?0, '_id': { '$lt': ?1 } }")
  List<NewsDocument> findNewsBySubCategoryAndCursor(String subcategory, ObjectId cursor,
      Pageable pageable);

  // 카테고리만으로 최신순 20개 (커서 없이)
  List<NewsDocument> findTop20BySubCategoryOrderByIdDesc(String subcategory);

  @Query("{ 'title': { '$regex': ?0, '$options': 'i' }, '_id': { '$lt': ?1 } }")
  List<NewsDocument> findByTitleContainingAndCursor(String keyword, ObjectId cursor,
      Pageable pageable);

  @Query("{ 'title': { '$regex': ?0, '$options': 'i' } }")
  List<NewsDocument> findTop20ByTitleContainingOrderByIdDesc(String keyword);

}
