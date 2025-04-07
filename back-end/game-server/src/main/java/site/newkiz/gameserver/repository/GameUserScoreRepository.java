package site.newkiz.gameserver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import site.newkiz.gameserver.entity.GameUserScore;

public interface GameUserScoreRepository extends JpaRepository<GameUserScore, Integer> {

  Optional<GameUserScore> findByUserId(int userId);
}
