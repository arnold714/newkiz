package site.newkiz.kidsnewsserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.newkiz.kidsnewsserver.Entity.Reply;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KidsnewsDto {
    private String id;
    private String title;
    private String content;
    private String img;
    private String author;
    private String userId;
    private int views;
    private int likes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<Reply> replyList;
}
