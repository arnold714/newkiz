package site.newkiz.mypageserver.global.exception;

import lombok.Getter;
import site.newkiz.mypageserver.global.error.ErrorCode;

@Getter
public class NotFoundException extends CustomException {

  private final ErrorCode errorCode;

  public NotFoundException() {
    super(ErrorCode.NOT_FOUND_EXCEPTION.getMessage());
    this.errorCode = ErrorCode.NOT_FOUND_EXCEPTION;
  }

  public NotFoundException(String message) {
    super(ErrorCode.NOT_FOUND_EXCEPTION.getMessage() + " : " + message);
    this.errorCode = ErrorCode.NOT_FOUND_EXCEPTION;
  }
}
