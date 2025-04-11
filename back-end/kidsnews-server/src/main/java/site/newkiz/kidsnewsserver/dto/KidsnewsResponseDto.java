package site.newkiz.kidsnewsserver.dto;

import lombok.Builder;
import lombok.Getter;
import site.newkiz.kidsnewsserver.Entity.Kidsnews;

import java.time.LocalDateTime;
import java.util.List;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReplyResponseDto> replies;

    public static KidsnewsResponseDto fromEntity(Kidsnews entity) {
        return KidsnewsResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .imgUrl(entity.getImg())
                .author(entity.getAuthor())
                .views(entity.getViews())
                .likes(entity.getLikes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .replies(entity.getReplyList() != null
                        ? entity.getReplyList().stream()
                        .map(ReplyResponseDto::fromEntity)
                        .toList()
                        : null)
                .build();
    }
}
