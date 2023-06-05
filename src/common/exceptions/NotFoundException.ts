import { AppError } from "./AppError";

export class NotFoundException extends AppError {
  constructor(detail: string = "Not Found") {
    super(404, detail);
  }
}
