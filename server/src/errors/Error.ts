class ErrorClass extends Error {
  status: string;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends Error {
  status: string;
  constructor(message) {
    super(message);
    this.status = "400";
  }
}

class Unauthorized extends Error {
  status: string;
  constructor(message) {
    super(message);
    this.status = "401";
  }
}

export { ErrorClass, BadRequest, Unauthorized };
