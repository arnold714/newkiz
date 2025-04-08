package site.newkiz.gameserver.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.newkiz.gameserver.entity.dto.RankSchool;
import site.newkiz.gameserver.entity.dto.RankUser;
import site.newkiz.gameserver.repository.GameSchoolScoreRepository;
import site.newkiz.gameserver.repository.GameUserScoreRepository;

@Service
@RequiredArgsConstructor
public class RankService {

  private final GameSchoolScoreRepository gameSchoolScoreRepository;
  private final GameUserScoreRepository gameUserScoreRepository;

  public List<RankSchool> getSchoolRanking() {
    List<Object[]> top10 = gameSchoolScoreRepository.findTop10SchoolScoresNative();

    List<RankSchool> rankSchools = new ArrayList<>();
    int rank = 1;
    for (int i = 0; i < top10.size(); i++) {
      if (i > 0) {
        rank =
            rankSchools.get(i - 1).getTotalScore() == ((Number) top10.get(i)[2]).intValue() ? rank
                : i + 1;
      }

      rankSchools.add(
          RankSchool.builder()
              .rank(rank)
              .schoolId(((Number) top10.get(i)[0]).intValue())
              .schoolName((String) top10.get(i)[1])
              .totalScore(((Number) top10.get(i)[2]).intValue())
              .build()
      );
      System.out.println(rankSchools.get(i));
    }

    return rankSchools;
  }

  public List<RankUser> getUserRanking() {
    List<Object[]> top10 = gameUserScoreRepository.findTop10UserScoresNative();

    List<RankUser> rankUsers = new ArrayList<>();
    int rank = 1;
    for (int i = 0; i < top10.size(); i++) {
      if (i > 0) {
        rank =
            rankUsers.get(i - 1).getTotalScore() == ((Number) top10.get(i)[3]).intValue() ? rank
                : i + 1;
      }

      rankUsers.add(
          RankUser.builder()
              .rank(rank)
              .userId(((Number) top10.get(i)[0]).intValue())
              .nickname((String) top10.get(i)[1])
              .characterId((String) top10.get(i)[2])
              .totalScore(((Number) top10.get(i)[3]).intValue())
              .build()
      );
      System.out.println(rankUsers.get(i));
    }

    return rankUsers;
  }
}

