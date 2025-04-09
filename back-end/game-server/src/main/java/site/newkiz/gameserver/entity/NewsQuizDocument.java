package site.newkiz.gameserver.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "articles_test")
@ToString
public class NewsQuizDocument {

  @Id
  private String id;

  private Quiz quiz;

  @Getter
  @Setter
  @ToString
  public static class Quiz {

    @Field("ox_quiz")
    private OxQuiz oxQuiz;
  }

  @Getter
  @Setter
  @ToString
  public static class OxQuiz {

    private String question;
    private String answer;
    private String explanation;
  }
  /**

   {
   "ox_quiz":{
   "question": "콜 어빈?",
   "answer": "X",
   "explanation": "콜 어빈은"
   },
   "multiple_choice_quiz": {
   "question": "콜 ",
   "options": ["박계범과 "],
   "answer": "박계범과 조수행",
   "explanation": "해당 뉴스 "
   }
   }
   *
   */
}

