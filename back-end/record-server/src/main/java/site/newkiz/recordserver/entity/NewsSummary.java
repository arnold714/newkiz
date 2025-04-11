package site.newkiz.recordserver.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "news_summaries")
@Document(collection = "news_summaries_test")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsSummary {
  @Id
  private String id;

  private String newsId;
  private String userId;
  private String summary;

  @LastModifiedDate
  private LocalDateTime updatedAt;
}
