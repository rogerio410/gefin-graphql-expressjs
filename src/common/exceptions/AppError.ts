export class AppError extends Error {
  constructor(public statusCode: number = 400, detail: string) {
    super(detail);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
  }
}
