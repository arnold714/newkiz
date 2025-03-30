package site.newkiz.newsserver.entitiy.enums;

import lombok.Getter;

@Getter
public enum NewsCategory {
  POLITICS("정치"),
  ECONOMY("경제"),
  SOCIETY("사회"),
  CULTURE("생활/문화"),
  IT_SCIENCE("IT/과학"),
  WORLD("세계"),
  SPORTS("스포츠"),
  ENTERTAINMENT("연예");

  private final String koreanName;

  NewsCategory(String koreanName) {
    this.koreanName = koreanName;
  }

  public static NewsCategory fromKoreanName(String koreanName) {
    for (NewsCategory category : values()) {
      if (category.getKoreanName().equals(koreanName)) {
        return category;
      }
    }
    throw new IllegalArgumentException("No enum constant for korean name: " + koreanName);
  }
}