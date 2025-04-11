package site.newkiz.mypageserver.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "news_scraps_test")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsScrap {

  @Id
  private String id;

  private String userId;
  private String newsId;

  @CreatedDate
  private LocalDateTime createdAt;
}
