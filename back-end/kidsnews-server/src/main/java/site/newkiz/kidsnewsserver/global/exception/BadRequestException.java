package site.newkiz.kidsnewsserver.global.exception;

import lombok.Getter;
import site.newkiz.kidsnewsserver.global.error.ErrorCode;

@Getter
public class BadRequestException extends CustomException {

    private final ErrorCode errorCode;

    public BadRequestException() {
        super(ErrorCode.BAD_REQUEST_EXCEPTION.getMessage());
        this.errorCode = ErrorCode.BAD_REQUEST_EXCEPTION;
    }

    public BadRequestException(String message) {
        super(ErrorCode.BAD_REQUEST_EXCEPTION.getMessage() + " : " + message);
        this.errorCode = ErrorCode.BAD_REQUEST_EXCEPTION;
    }

}
