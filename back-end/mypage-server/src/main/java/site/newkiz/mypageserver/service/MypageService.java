package site.newkiz.mypageserver.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.newkiz.mypageserver.entity.Interest;
import site.newkiz.mypageserver.entity.InterestId;
import site.newkiz.mypageserver.entity.Profile;
import site.newkiz.mypageserver.entity.School;
import site.newkiz.mypageserver.entity.dto.MypageRequest;
import site.newkiz.mypageserver.entity.dto.MypageResponse;
import site.newkiz.mypageserver.entity.enums.Gender;
import site.newkiz.mypageserver.entity.enums.NewsCategory;
import site.newkiz.mypageserver.global.exception.NotFoundException;
import site.newkiz.mypageserver.repository.InterestRepository;
import site.newkiz.mypageserver.repository.ProfileRepository;
import site.newkiz.mypageserver.repository.SchoolRepository;

@Service
@RequiredArgsConstructor
public class MypageService {

  private final ProfileRepository profileRepository;
  private final InterestRepository interestRepository;
  private final SchoolRepository schoolRepository;

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
  public MypageResponse updateMypage(Integer userId, MypageRequest request) {
    School school = schoolRepository.findById(request.getSchool())
        .orElseThrow(() -> new NotFoundException("school not found."));
    Profile profile = Profile.builder()
        .userId(userId)
        .nickname(request.getNickname())
        .birthday(request.getBirthday())
        .school(school)
        .gender(Gender.valueOf(request.getGender()))
        .difficulty(request.getDifficulty())
        .build();
    profileRepository.save(profile);

    List<String> interestNames = request.getInterests();
    List<Interest> interests = interestNames.stream()
        .map(name -> Interest.builder().id(new InterestId(userId, NewsCategory.valueOf(name)))
            .build())
        .collect(Collectors.toList());
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
}
