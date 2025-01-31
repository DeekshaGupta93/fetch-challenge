class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }

  toJson() {
    return { status: this.statusCode, description: this.message };
  }
}

class NotFoundError extends CustomError {
  constructor() {
    const ERROR_MESSAGE = "No receipt found for that ID.";
    const STATUS_CODE = 404;
    super(ERROR_MESSAGE, STATUS_CODE);
    this.name = this.constructor.name;
  }
}

class BadRequestError extends CustomError {
  constructor() {
    const ERROR_MESSAGE = "The receipt is invalid.";
    const STATUS_CODE = 400;
    super(ERROR_MESSAGE, STATUS_CODE);
    this.name = this.constructor.name;
  }
}

export { NotFoundError, BadRequestError, CustomError };
