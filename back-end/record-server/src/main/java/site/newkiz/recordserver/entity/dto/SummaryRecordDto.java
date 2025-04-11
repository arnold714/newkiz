package site.newkiz.recordserver.entity.dto;

import lombok.Builder;
import lombok.Getter;
import site.newkiz.recordserver.entity.NewsDocument;
import site.newkiz.recordserver.entity.NewsSummary;

@Getter
@Builder
public class SummaryRecordDto {

  private NewsSummary newsSummary;
  private NewsDocument newsDocument;
}
