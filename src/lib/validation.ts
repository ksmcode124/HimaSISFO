import { ZodError } from "zod";

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function isPrismaError(error: unknown): error is { code?: string } {
  return typeof error === "object" && error !== null && "code" in error;
}
