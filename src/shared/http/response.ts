import { nanoid } from "nanoid";
import { type Response } from "express";

export type HttpResponse<T> = {
  transactionId: string;
  message: string;
  data?: T;
  error?: string;
};

export const httpResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  error?: string,
) => {
  const response: HttpResponse<T> = {
    transactionId: nanoid(),
    message,
  };

  if (data) response.data = data;
  if (error) response.error = error;

  return res.status(statusCode).json(response);
};
