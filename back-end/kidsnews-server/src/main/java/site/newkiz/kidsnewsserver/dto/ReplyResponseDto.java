package site.newkiz.kidsnewsserver.dto;

import lombok.Builder;
import lombok.Getter;
import site.newkiz.kidsnewsserver.Entity.Reply;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReplyResponseDto {
    private String id;
    private String content;
    private String author;
    private boolean isUpdated;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReplyResponseDto fromEntity(Reply reply) {
        return ReplyResponseDto.builder()
                .id(reply.getId())
                .content(reply.getContent())
                .author(reply.getAuthor())
                .isUpdated(reply.isUpdated())
                .createdAt(reply.getCreatedAt())
                .updatedAt(reply.getUpdatedAt())
                .build();
    }
}
