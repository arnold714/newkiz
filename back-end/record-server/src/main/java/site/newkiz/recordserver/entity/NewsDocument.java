package site.newkiz.recordserver.entity;

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
//@Document(collection = "articles")
public class NewsDocument {

  @Id
  private String id;

  private String title;
  private String link;
  private LocalDateTime published;
  private String category;
  @Field("sub_category")
  private String subCategory;
  private String article;
  private String img;
  private String summary;
  private int views;
  private int scrap;
  @Field("context_list")
  private List<ContextLevel> contextList;
  @Field("word_list")
  private List<Word> wordList;

  @Getter
  @Setter
  public static class ContextLevel {

    private int level;
    private List<ContextData> context;
  }

  @Getter
  @Setter
  public static class ContextData {

    private String type;
    private String data;
  }


  @Getter
  @Setter
  public static class Word {

    private String word;
    private String mean;
  }
}
