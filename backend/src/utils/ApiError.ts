class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  success: boolean;
  message: string;
  data?: any;

  constructor(
    statusCode: number,
    errorMessage: string | string[],
    data?: any,
    isOperational = true,
    stack = ''
  ) {
    const message = Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage;

    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.success = false; // By default, the success flag is set to false for errors
    this.message = message;

    if (data) {
      this.data = data;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
