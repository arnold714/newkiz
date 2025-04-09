package site.newkiz.kidsnewsserver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.newkiz.kidsnewsserver.Entity.Kidsnews;
import site.newkiz.kidsnewsserver.Entity.Reply;
import site.newkiz.kidsnewsserver.dto.*;
import site.newkiz.kidsnewsserver.repository.KidsnewsRepository;
import site.newkiz.kidsnewsserver.util.S3Uploader;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class KidsnewsArticleService {

    private final KidsnewsRepository kidsnewsRepository;
    private final S3Uploader s3Uploader;

    @Value("${article.limit}")
    private int limit;

    public List<KidsnewsResponseDto> getAll(String cursor) {
        List<Kidsnews> allArticles = kidsnewsRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Kidsnews::getCreatedAt).reversed())
                .toList();

        if (cursor == null) {
            return allArticles.stream()
                    .limit(limit)
                    .map(KidsnewsResponseDto::fromEntity)
                    .toList();
        }


        // cursor 기준 이후 데이터만 필터링
        Optional<Kidsnews> cursorNews = kidsnewsRepository.findById(cursor);
        if (cursorNews.isEmpty()) {
            return List.of(); // 잘못된 커서면 빈 리스트
        }

        LocalDateTime cursorTime = cursorNews.get().getCreatedAt();

        return allArticles.stream()
                .filter(news -> news.getCreatedAt().isBefore(cursorTime))
                .limit(limit)
                .map(KidsnewsResponseDto::fromEntity)
                .toList();
    }


    public KidsnewsResponseDto create(String userId, KidsnewsCreateRequest request) throws IOException {
        Kidsnews news = new Kidsnews();
        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setAuthor(request.getAuthor());
        news.setUserId(userId);
        news.setViews(0);
        news.setLikes(0);
        news.setCreatedAt(LocalDateTime.now());
        news.setUpdatedAt(LocalDateTime.now());
        news.setReplyList(new ArrayList<>());

        MultipartFile image = request.getImage();
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Uploader.uploadImage(image, "kidsnews");
            news.setImg(imageUrl);
        }

        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }

    public KidsnewsResponseDto getById(String id) {
        Kidsnews news = kidsnewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));
        news.setViews(news.getViews() + 1);
        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }

    public KidsnewsResponseDto update(String id, String userId, KidsnewsUpdateRequest request) throws IOException {
        Kidsnews news = kidsnewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));

        if (!news.getUserId().equals(userId)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setUpdatedAt(LocalDateTime.now());

        MultipartFile image = request.getImage();
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Uploader.uploadImage(image, "kidsnews");
            news.setImg(imageUrl);
        }

        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }


    public void delete(String id, String userId) {
        Kidsnews news = kidsnewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));

        if (!news.getUserId().equals(userId)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        kidsnewsRepository.deleteById(id);
    }

    public KidsnewsResponseDto like(String id, String userId) {
        Kidsnews news = kidsnewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));
        news.setLikes(news.getLikes() + 1);
        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }

    public KidsnewsResponseDto addReply(String id, String userId, ReplyCreateRequest request) {
        Kidsnews news = kidsnewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));
        Reply reply = new Reply();
        reply.setId(UUID.randomUUID().toString());
        reply.setContent(request.getContent());
        reply.setAuthor(request.getAuthor());
        reply.setUserId(userId);
        reply.setCreatedAt(LocalDateTime.now());
        reply.setUpdatedAt(LocalDateTime.now());
        reply.setUpdated(false);

        news.getReplyList().add(reply);
        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }

    public KidsnewsResponseDto updateReply(String newsId, String replyId, String userId, ReplyUpdateRequest request) {
        Kidsnews news = kidsnewsRepository.findById(newsId)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));

        for (Reply reply : news.getReplyList()) {
            if (reply.getId().equals(replyId) && reply.getUserId().equals(userId)) {
                reply.setContent(request.getContent());
                reply.setUpdated(true);
                reply.setUpdatedAt(LocalDateTime.now());
                break;
            }
        }

        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }

    public KidsnewsResponseDto deleteReply(String newsId, String replyId, String userId) {
        Kidsnews news = kidsnewsRepository.findById(newsId)
                .orElseThrow(() -> new RuntimeException("뉴스가 존재하지 않습니다."));

        news.getReplyList().removeIf(reply -> reply.getId().equals(replyId) && reply.getUserId().equals(userId));
        return KidsnewsResponseDto.fromEntity(kidsnewsRepository.save(news));
    }
}
