package site.newkiz.gameserver.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.newkiz.gameserver.entity.GameUserScore;

public interface GameUserScoreRepository extends JpaRepository<GameUserScore, Integer> {

  Optional<GameUserScore> findByUserId(int userId);

  @Query(value =
      "SELECT u.id as userId, p.nickname, p.character_id as characterId, g.total_score AS totalScore "
          +
          "FROM user u " +
          "JOIN game_user_score g ON g.user_id = u.id " +
          "JOIN profile p ON p.user_id = u.id " +
          "ORDER BY g.total_score DESC " +
          "LIMIT 10",
      nativeQuery = true)
  List<Object[]> findTop10UserScoresNative();
}
