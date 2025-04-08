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
    public ApiResponse<> generateKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                       @RequestHeader(value = "User-Id") String userId,
                                       @RequestBody SolveQuizRequest solveQuizRequest) {

    }

    @GetMapping("/{kidsnewsId}")
    public ApiResponse<> getKidsnewsArticleById(@PathVariable(value = "kidsnewsId") String kidsnewsId,
                                                 @RequestHeader(value = "USER-ID") String userId) {

    }

    @PatchMapping("/{kidsnewsId}")
    public ApiResponse<> modifyKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                               @RequestHeader(value = "User-Id") String userId,
                                               @RequestBody SolveQuizRequest solveQuizRequest) {

    }

    @DeleteMapping("/{kidsnewsId}")
    public ApiResponse<> deleteKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                               @RequestHeader(value = "User-Id") String userId,
                                               @RequestBody SolveQuizRequest solveQuizRequest) {
    }

    @PostMapping("/{kidsnewsId}/likes")
    public ApiResponse<> likeKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                                 @RequestHeader(value = "User-Id") String userId,
                                                 @RequestBody SolveQuizRequest solveQuizRequest) {
    }


    @PostMapping("/{kidsnewsId}/reply")
    public ApiResponse<> generateKidsnewsArticleReply(@PathVariable(value = "newsId") String newsId,
                                                 @RequestHeader(value = "User-Id") String userId,
                                                 @RequestBody SolveQuizRequest solveQuizRequest) {

    }

    @PatchMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<> modifyKidsnewsArticleReply(@PathVariable(value = "newsId") String newsId,
                                                 @RequestHeader(value = "User-Id") String userId,
                                                 @RequestBody SolveQuizRequest solveQuizRequest) {

    }

    @DeleteMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<> deleteKidsnewsArticle(@PathVariable(value = "newsId") String newsId,
                                                 @RequestHeader(value = "User-Id") String userId,
                                                 @RequestBody SolveQuizRequest solveQuizRequest) {

    }


}
