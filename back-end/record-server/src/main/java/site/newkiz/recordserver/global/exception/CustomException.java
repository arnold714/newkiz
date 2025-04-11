package site.newkiz.recordserver.global.exception;

import lombok.Getter;
import site.newkiz.recordserver.global.error.ErrorCode;

@Getter
public class CustomException extends RuntimeException {

  private ErrorCode errorCode;

  public CustomException(String message) {
    super(message);
  }

  public CustomException(ErrorCode errorCode, String message) {
    super(message);
    this.errorCode = errorCode;
  }
}
