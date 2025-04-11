package site.newkiz.newsserver.global.exception;

import lombok.Getter;
import site.newkiz.newsserver.global.error.ErrorCode;

@Getter
public class ForbiddenException extends CustomException {

  private final ErrorCode errorCode;

  public ForbiddenException() {
    super(ErrorCode.FORBIDDEN_EXCEPTION.getMessage());
    this.errorCode = ErrorCode.FORBIDDEN_EXCEPTION;
  }

  public ForbiddenException(String message) {
    super(ErrorCode.FORBIDDEN_EXCEPTION.getMessage() + " : " + message);
    this.errorCode = ErrorCode.FORBIDDEN_EXCEPTION;
  }
}
