package site.newkiz.newsserver.entity;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "quiz_solve_logs_test")
public class QuizSolveLog {

  @Id
  private String id;

  private String userId;
  private String newsId;
  private Boolean isCorrect;

  @LastModifiedDate
  private LocalDateTime solvedAt;
}
