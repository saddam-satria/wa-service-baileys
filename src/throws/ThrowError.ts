class ThrowError extends Error {
  message: string;
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ThrowError;
