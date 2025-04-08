package site.newkiz.kidsnewsserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.newkiz.kidsnewsserver.global.ApiResponse;
import site.newkiz.kidsnewsserver.service.KidsnewsArticleService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kidsnews")
public class KidsnewsArticleController {

    private final KidsnewsArticleService kidsnewsArticleService;

    @GetMapping
    public ApiResponse<> getKidsnewsArticle(
            @RequestParam(value = "cursor", required = false) String cursor) {

    }

    @PostMapping
    public ApiResponse<> generateKidsnewsArticle(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                                 @RequestHeader(value = "User-Id") String userId,
                                                 @RequestBody ) {

    }

    @GetMapping("/{kidsnewsId}")
    public ApiResponse<> getKidsnewsArticleById(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                                 @RequestHeader(value = "USER-ID") String userId) {

    }

    @PatchMapping("/{kidsnewsId}")
    public ApiResponse<> modifyKidsnewsArticle(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                               @RequestHeader(value = "User-Id") String userId,
                                               @RequestBody ) {

    }

    @DeleteMapping("/{kidsnewsId}")
    public ApiResponse<> deleteKidsnewsArticle(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                               @RequestHeader(value = "User-Id") String userId) {
    }

    @PostMapping("/{kidsnewsId}/likes")
    public ApiResponse<> likeKidsnewsArticle(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                             @RequestHeader(value = "User-Id") String userId) {
    }


    @PostMapping("/{kidsnewsId}/reply")
    public ApiResponse<> generateKidsnewsArticleReply(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                                      @RequestHeader(value = "User-Id") String userId,
                                                      @RequestBody) {

    }

    @PatchMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<> modifyKidsnewsArticleReply(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                                    @RequestHeader(value = "User-Id") String userId,
                                                    @RequestBody) {

    }

    @DeleteMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<> deleteKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                               @RequestHeader(value = "User-Id") String userId,
                                               @RequestBody) {

    }


}
