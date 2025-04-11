package site.newkiz.mypageserver.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.newkiz.mypageserver.entity.CategoryScore;
import site.newkiz.mypageserver.entity.Interest;
import site.newkiz.mypageserver.entity.InterestId;
import site.newkiz.mypageserver.entity.NewsDocument;
import site.newkiz.mypageserver.entity.NewsScrap;
import site.newkiz.mypageserver.entity.Profile;
import site.newkiz.mypageserver.entity.School;
import site.newkiz.mypageserver.entity.dto.CategoryScoreDto;
import site.newkiz.mypageserver.entity.dto.MypageRequest;
import site.newkiz.mypageserver.entity.dto.MypageResponse;
import site.newkiz.mypageserver.entity.dto.MypageUpdateRequest;
import site.newkiz.mypageserver.entity.enums.Gender;
import site.newkiz.mypageserver.entity.enums.NewsCategory;
import site.newkiz.mypageserver.global.exception.NotFoundException;
import site.newkiz.mypageserver.repository.InterestRepository;
import site.newkiz.mypageserver.repository.NewsRepository;
import site.newkiz.mypageserver.repository.NewsScrapRepository;
import site.newkiz.mypageserver.repository.ProfileRepository;
import site.newkiz.mypageserver.repository.SchoolRepository;

@Service
@RequiredArgsConstructor
public class MypageService {

  private final ProfileRepository profileRepository;
  private final InterestRepository interestRepository;
  private final SchoolRepository schoolRepository;
  private final NewsRepository newsRepository;
  private final NewsScrapRepository newsScrapRepository;
  private final MongoTemplate mongoTemplate;

  public MypageResponse getMypage(Integer userId) {
    Profile profile = profileRepository.findByUserId(userId)
        .orElseThrow(() -> new NotFoundException("profile not found."));
    List<String> interestCategories = interestRepository.findAllById_UserId(userId)
        .stream()
        .map(interest -> interest.getId().getCategory().name())
        .collect(Collectors.toList());
    return MypageResponse.builder()
        .profile(profile)
        .interests(interestCategories)
        .build();
  }

  @Transactional
  public MypageResponse registMypage(Integer userId, MypageRequest request) {
    School school = schoolRepository.findById(request.getSchool())
        .orElseThrow(() -> new NotFoundException("school not found."));
    Profile profile = Profile.builder()
        .userId(userId)
        .nickname(request.getNickname())
        .birthday(request.getBirthday())
        .school(school)
        .gender(Gender.valueOf(request.getGender()))
        .difficulty(request.getDifficulty())
        .characterId(request.getCharacterId())
        .build();
    profileRepository.save(profile);

    List<String> interestNames = request.getInterests();
    List<Interest> interests = interestNames.stream()
        .map(name -> Interest.builder().id(new InterestId(userId, NewsCategory.valueOf(name)))
            .build())
        .collect(Collectors.toList());
    interestRepository.saveAll(interests);

    mongoTemplate.save(CategoryScore.builder()
        .userId(userId)
        .WORLD(0)
        .CULTURE(0)
        .ECONOMY(0)
        .IT_SCIENCE(0)
        .POLITICS(0)
        .SOCIETY(0)
        .SPORTS(0)
        .build());

    return MypageResponse.builder()
        .profile(profile)
        .interests(interests.stream()
            .map(interest -> interest.getId().getCategory().name())
            .collect(Collectors.toList()))
        .build();
  }

  @Transactional
  public MypageResponse updateMypage(Integer userId, MypageUpdateRequest request) {
    School school = schoolRepository.findById(request.getSchool())
        .orElseThrow(() -> new NotFoundException("school not found."));
    Profile profile = profileRepository.findByUserId(userId)
        .orElseThrow(() -> new NotFoundException("profile not found."));
    profile.setNickname(request.getNickname());
    profile.setSchool(school);
    profile.setDifficulty(request.getDifficulty());
    profile.setCharacterId(request.getCharacterId());

    List<String> interestNames = request.getInterests();
    List<Interest> interests = interestNames.stream()
        .map(name -> Interest.builder().id(new InterestId(userId, NewsCategory.valueOf(name)))
            .build())
        .collect(Collectors.toList());
    interestRepository.deleteAllById_UserId(userId);
    interestRepository.saveAll(interests);

    return MypageResponse.builder()
        .profile(profile)
        .interests(interests.stream()
            .map(interest -> interest.getId().getCategory().name())
            .collect(Collectors.toList()))
        .build();
  }

  public List<School> getSchools() {
    return schoolRepository.findAll();
  }


  public List<NewsDocument> getScrapNews(Integer userId) {
    // 1. 스크랩 정보 가져오기
    List<NewsScrap> scraps = newsScrapRepository.findAllByUserId(userId.toString());

    // 2. 뉴스 ID 목록 만들기
    List<String> newsIds = scraps.stream()
        .map(NewsScrap::getNewsId)
        .collect(Collectors.toList());

    List<NewsDocument> result = newsIds.stream()
        .map(newsId -> newsRepository.findById(newsId).orElse(null))
        .collect(Collectors.toList());

    return result;
  }

  public CategoryScoreDto getGraph(Integer userId) {
    CategoryScore categoryScore = mongoTemplate.findById(userId, CategoryScore.class);

    if (categoryScore == null) {
      throw new NotFoundException("Category score not found.");
    }

    // 각 점수 추출
    int politics = categoryScore.getPOLITICS();
    int economy = categoryScore.getECONOMY();
    int society = categoryScore.getSOCIETY();
    int culture = categoryScore.getCULTURE();
    int itScience = categoryScore.getIT_SCIENCE();
    int world = categoryScore.getWORLD();
    int sports = categoryScore.getSPORTS();

    // 최대값 기준 정규화
    int maxScore = Collections.max(Arrays.asList(
        politics, economy, society, culture, itScience, world, sports, 1
        // 최소 1 이상으로 divide-by-zero 방지
    ));

    return CategoryScoreDto.builder()
        .userId(userId)
        .POLITICS(normalize(politics, maxScore))
        .ECONOMY(normalize(economy, maxScore))
        .SOCIETY(normalize(society, maxScore))
        .CULTURE(normalize(culture, maxScore))
        .IT_SCIENCE(normalize(itScience, maxScore))
        .WORLD(normalize(world, maxScore))
        .SPORTS(normalize(sports, maxScore))
        .build();
  }

  private int normalize(int value, int max) {
    if (max == 0) {
      return 0;
    }
    return (int) ((double) value / max * 100);
  }

}
