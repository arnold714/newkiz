package site.newkiz.kidsnewsserver.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import site.newkiz.kidsnewsserver.Entity.Kidsnews;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
public class KidsnewsResponseDto {
    private String id;
    private String title;
    private String content;
    private String imgUrl;
    private String author;
    private int views;
    private int likes;
    private String userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReplyResponseDto> replies;

    public static KidsnewsResponseDto fromEntity(Kidsnews kidsnews) {
        return KidsnewsResponseDto.builder()
                .id(kidsnews.getId())
                .title(kidsnews.getTitle())
                .content(kidsnews.getContent())
                .imgUrl(kidsnews.getImg())
                .author(kidsnews.getAuthor())
                .views(kidsnews.getViews())
                .likes(kidsnews.getLikes())
                .userId(kidsnews.getUserId())
                .createdAt(kidsnews.getCreatedAt())
                .updatedAt(kidsnews.getUpdatedAt())
                .replies(kidsnews.getReplyList() != null
                        ? kidsnews.getReplyList().stream()
                        .map(ReplyResponseDto::fromEntity)
                        .toList()
                        : null)
                .build();
    }
}
