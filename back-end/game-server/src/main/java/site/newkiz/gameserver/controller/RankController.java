package site.newkiz.gameserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.newkiz.gameserver.entity.dto.RankDto;
import site.newkiz.gameserver.global.ApiResponse;
import site.newkiz.gameserver.service.RankService;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class RankController {

  private final RankService rankService;

  @GetMapping("/rank/school")
  public ApiResponse<?> getSchoolRanking() {
    return ApiResponse.success(new RankDto(rankService.getSchoolRanking()));
  }

  @GetMapping("/rank/user")
  public ApiResponse<?> getUserRanking() {
    return ApiResponse.success(new RankDto(rankService.getUserRanking()));
  }
}
