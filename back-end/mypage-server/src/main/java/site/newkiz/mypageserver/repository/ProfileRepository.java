package site.newkiz.mypageserver.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import site.newkiz.mypageserver.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

  Optional<Profile> findByUserId(Integer userId);
}
