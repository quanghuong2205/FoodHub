class CustomError extends Error {
  data: unknown;
  status: number;
  constructor(message: string, data: unknown, status: number) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export default CustomError;
