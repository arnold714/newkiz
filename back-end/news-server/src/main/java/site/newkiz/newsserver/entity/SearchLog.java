package site.newkiz.newsserver.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "search_logs")
public class SearchLog {

  @Id
  private String id;
  private String userId;
  private String keyword;
  private LocalDateTime searchedAt;
}