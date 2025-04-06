package site.newkiz.newsserver.entity;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "articles_test")
public class NewsQuizDocument {

  @Id
  private String id;

  private Quiz quiz;

  @Getter
  @Setter
  public static class Quiz {
    @Field("multiple_choice_quiz")
    private MultipleChoiceQuiz multipleChoiceQuiz;
  }

  @Getter
  @Setter
  public static class MultipleChoiceQuiz {
    private String question;
    private List<String> options;
    private String answer;
  }

}
