package site.newkiz.newsserver.entity;

import java.time.LocalDateTime;
import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "news_view_logs")
@Builder
@Document(collection = "news_view_logs_test")
public class NewsViewLog {

  @Id
  private String id;

  private String userId;         // 사용자 ID
  private String newsId;         // 어떤 뉴스

  @CreatedDate
  private LocalDateTime viewedAt;
}

