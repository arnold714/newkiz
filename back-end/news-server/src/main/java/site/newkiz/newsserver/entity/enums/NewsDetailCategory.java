package site.newkiz.newsserver.entity.enums;

import lombok.Getter;
import site.newkiz.newsserver.global.exception.BadRequestException;

@Getter
public enum NewsDetailCategory {

  // IT/과학
  AI("인공지능과 로봇"),
  DIGITAL_TECH("디지털 기술과 인터넷"),
  SPACE_SCIENCE("우주와 자연 과학"),
  GENERAL_IT_SCIENCE("IT/과학 일반"),

  // 정치
  GOVERNMENT_POLICY("정부와 정책"),
  NATIONAL_ASSEMBLY_LAW("국회와 법률"),
  ELECTION_PARTY("선거와 정당"),

  // 경제
  FINANCE_INVESTMENT("금융과 투자"),
  CONSUMPTION_PRICES("소비와 물가"),

  // 사회
  EDUCATION_SCHOOLS("교육과 학교"),
  ENVIRONMENT_DISASTER("환경과 재해"),
  SAFETY_HEALTH("안전과 건강"),
  GENERAL_SOCIAL("사회 일반"),

  // 생활/문화
  CULTURE_ART("문화와 예술"),
  LEISURE_LIFESTYLE("여가와 생활"),

  // 세계
  GLOBAL_POLITICS_ECONOMY("국제 사회와 글로벌 경제"),
  WORLD_CULTURE_LIFE("세계 문화와 생활"),

  // 스포츠
  SOCCER("축구"),
  BASEBALL("야구"),
  BASKETBALL("농구"),
  VOLLEYBALL("배구"),
  OLYMPIC_GLOBAL("올림픽과 국제대회"),
  GENERAL_SPORTS("스포츠 일반");

  private final String koreanName;

  NewsDetailCategory(String koreanName) {
    this.koreanName = koreanName;
  }

  public static NewsDetailCategory fromKoreanName(String koreanName) {
    for (NewsDetailCategory sub : values()) {
      if (sub.getKoreanName().equals(koreanName)) {
        return sub;
      }
    }
    throw new BadRequestException("Unknown Korean name: " + koreanName);
  }
}
