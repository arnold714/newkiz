package site.newkiz.kidsnewsserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.newkiz.kidsnewsserver.dto.*;
import site.newkiz.kidsnewsserver.global.ApiResponse;
import site.newkiz.kidsnewsserver.service.KidsnewsArticleService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kidsnews")
public class KidsnewsArticleController {

    private final KidsnewsArticleService kidsnewsArticleService;

    @GetMapping
    public ApiResponse<List<KidsnewsResponseDto>> getKidsnewsArticle(
            @RequestParam(value = "cursor", required = false) String cursor) {
        return ApiResponse.success(kidsnewsArticleService.getAll(cursor));
    }

    @PostMapping
    public ApiResponse<KidsnewsResponseDto> generateKidsnewsArticle(
            @RequestHeader("User-Id") String userId,
            @RequestPart("title") String title,
            @RequestPart("content") String content,
            @RequestPart("author") String author,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        KidsnewsCreateRequest request = new KidsnewsCreateRequest();
        request.setTitle(title);
        request.setContent(content);
        request.setAuthor(author);
        request.setImage(image);

        return ApiResponse.success(kidsnewsArticleService.create(userId, request));
    }

    @GetMapping("/{kidsnewsId}")
    public ApiResponse<KidsnewsResponseDto> getKidsnewsArticleById(@PathVariable String kidsnewsId,
                                                                   @RequestHeader("USER-ID") String userId) {
        return ApiResponse.success(kidsnewsArticleService.getById(kidsnewsId));
    }

    @PatchMapping("/{kidsnewsId}")
    public ApiResponse<KidsnewsResponseDto> modifyKidsnewsArticle(
            @PathVariable String kidsnewsId,
            @RequestHeader("User-Id") String userId,
            @RequestPart("title") String title,
            @RequestPart("content") String content,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        KidsnewsUpdateRequest request = new KidsnewsUpdateRequest();
        request.setTitle(title);
        request.setContent(content);
        request.setImage(image);

        return ApiResponse.success(kidsnewsArticleService.update(kidsnewsId, userId, request));
    }

    @DeleteMapping("/{kidsnewsId}")
    public ApiResponse<Void> deleteKidsnewsArticle(@PathVariable String kidsnewsId,
                                                   @RequestHeader("User-Id") String userId) {
        kidsnewsArticleService.delete(kidsnewsId, userId);
        return ApiResponse.success(null);
    }

    @PostMapping("/{kidsnewsId}/likes")
    public ApiResponse<KidsnewsResponseDto> likeKidsnewsArticle(@PathVariable String kidsnewsId,
                                                                @RequestHeader("User-Id") String userId) {
        return ApiResponse.success(kidsnewsArticleService.like(kidsnewsId, userId));
    }

    @PostMapping("/{kidsnewsId}/reply")
    public ApiResponse<KidsnewsResponseDto> generateKidsnewsArticleReply(@PathVariable String kidsnewsId,
                                                                         @RequestHeader("User-Id") String userId,
                                                                         @RequestBody ReplyCreateRequest request) {
        return ApiResponse.success(kidsnewsArticleService.addReply(kidsnewsId, userId, request));
    }

    @PatchMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<KidsnewsResponseDto> modifyKidsnewsArticleReply(@PathVariable String kidsnewsId,
                                                                       @PathVariable String replyId,
                                                                       @RequestHeader("User-Id") String userId,
                                                                       @RequestBody ReplyUpdateRequest request) {
        return ApiResponse.success(kidsnewsArticleService.updateReply(kidsnewsId, replyId, userId, request));
    }

    @DeleteMapping("/{kidsnewsId}/reply/{replyId}")
    public ApiResponse<KidsnewsResponseDto> deleteKidsnewsArticleReply(@PathVariable String kidsnewsId,
                                                                       @PathVariable String replyId,
                                                                       @RequestHeader("User-Id") String userId) {
        return ApiResponse.success(kidsnewsArticleService.deleteReply(kidsnewsId, replyId, userId));
    }
}
