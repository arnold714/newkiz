package site.newkiz.newsserver.entitiy;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "articles_test")
//@Document(collection = "articles")
public class NewsDocument {
  @Id
  private String id;

  private String title;
  private String link;
  private LocalDateTime published;
  private String category;
  private String article;
  private String img;
  private int views;
}
