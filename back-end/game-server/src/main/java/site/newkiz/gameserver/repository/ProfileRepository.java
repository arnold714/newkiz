package site.newkiz.gameserver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import site.newkiz.gameserver.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

  Optional<Profile> findByUserId(Integer userId);
}
