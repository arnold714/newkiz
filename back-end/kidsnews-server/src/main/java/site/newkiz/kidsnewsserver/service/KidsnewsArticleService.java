package site.newkiz.kidsnewsserver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.newkiz.kidsnewsserver.Entity.Kidsnews;
import site.newkiz.kidsnewsserver.Entity.Reply;
import site.newkiz.kidsnewsserver.dto.KidsnewsCreateRequest;
import site.newkiz.kidsnewsserver.dto.KidsnewsUpdateRequest;
import site.newkiz.kidsnewsserver.dto.ReplyCreateRequest;
import site.newkiz.kidsnewsserver.dto.ReplyUpdateRequest;
import site.newkiz.kidsnewsserver.repository.KidsnewsRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class KidsnewsArticleService {

    private final KidsnewsRepository kidsnewsRepository;

    public List<Kidsnews> getAll(String cursor) {
        // 간단한 페이징 (cursor: ID 기준으로 이후 뉴스 가져오기)
        if (cursor == null) {
            return kidsnewsRepository.findAll();
        }

        Optional<Kidsnews> cursorNews = kidsnewsRepository.findById(cursor);
        if (cursorNews.isEmpty()) {
            return kidsnewsRepository.findAll();
        }

        LocalDateTime cursorTime = cursorNews.get().getCreatedAt();
        return kidsnewsRepository.findAll().stream()
                .filter(news -> news.getCreatedAt().isBefore(cursorTime))
                .toList();
    }

    public Kidsnews create(String userId, KidsnewsCreateRequest request) {
        Kidsnews news = new Kidsnews();
        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setImg(request.getImg());
        news.setAuthor(request.getAuthor());
        news.setUserId(userId);
        news.setViews(0);
        news.setLikes(0);
        news.setCreatedAt(LocalDateTime.now());
        news.setUpdatedAt(LocalDateTime.now());
        news.setReplyList(new ArrayList<>());

        return kidsnewsRepository.save(news);
    }

    public Kidsnews getById(String id) {
        Kidsnews news = kidsnewsRepository.findById(id).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        news.setViews(news.getViews() + 1);
        return kidsnewsRepository.save(news);
    }

    public Kidsnews update(String id, String userId, KidsnewsUpdateRequest request) {
        Kidsnews news = kidsnewsRepository.findById(id).orElseThrow(() -> new RuntimeException("뉴스 없음"));

        if (!news.getUserId().equals(userId)) {
            throw new RuntimeException("작성자만 수정 가능");
        }

        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setImg(request.getImg());
        news.setUpdatedAt(LocalDateTime.now());

        return kidsnewsRepository.save(news);
    }

    public void delete(String id, String userId) {
        Kidsnews news = kidsnewsRepository.findById(id).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        if (!news.getUserId().equals(userId)) {
            throw new RuntimeException("작성자만 삭제 가능");
        }
        kidsnewsRepository.deleteById(id);
    }

    public Kidsnews like(String id, String userId) {
        Kidsnews news = kidsnewsRepository.findById(id).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        news.setLikes(news.getLikes() + 1);
        return kidsnewsRepository.save(news);
    }

    public Kidsnews addReply(String id, String userId, ReplyCreateRequest request) {
        Kidsnews news = kidsnewsRepository.findById(id).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        Reply reply = new Reply();
        reply.setId(UUID.randomUUID().toString());
        reply.setContent(request.getContent());
        reply.setAuthor(request.getAuthor());
        reply.setUserId(userId);
        reply.setCreatedAt(LocalDateTime.now());
        reply.setUpdatedAt(LocalDateTime.now());
        reply.setUpdated(false);
        news.getReplyList().add(reply);
        return kidsnewsRepository.save(news);
    }

    public Kidsnews updateReply(String newsId, String replyId, String userId, ReplyUpdateRequest request) {
        Kidsnews news = kidsnewsRepository.findById(newsId).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        for (Reply reply : news.getReplyList()) {
            if (reply.getId().equals(replyId) && reply.getUserId().equals(userId)) {
                reply.setContent(request.getContent());
                reply.setUpdatedAt(LocalDateTime.now());
                reply.setUpdated(true);
                break;
            }
        }
        return kidsnewsRepository.save(news);
    }

    public Kidsnews deleteReply(String newsId, String replyId, String userId) {
        Kidsnews news = kidsnewsRepository.findById(newsId).orElseThrow(() -> new RuntimeException("뉴스 없음"));
        news.getReplyList().removeIf(reply -> reply.getId().equals(replyId) && reply.getUserId().equals(userId));
        return kidsnewsRepository.save(news);
    }
}
