package site.newkiz.gameserver.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.newkiz.gameserver.entity.GameSchoolScore;
import site.newkiz.gameserver.entity.School;

public interface GameSchoolScoreRepository extends JpaRepository<GameSchoolScore, Integer> {

  Optional<GameSchoolScore> findBySchool(School school);

  @Query(value = "SELECT s.id as schoolId, s.name AS schoolName, g.total_score AS totalScore " +
      "FROM game_school_score g " +
      "JOIN school s ON g.school_id = s.id " +
      "ORDER BY g.total_score DESC " +
      "LIMIT 10",
      nativeQuery = true)
  List<Object[]> findTop10SchoolScoresNative();
}
