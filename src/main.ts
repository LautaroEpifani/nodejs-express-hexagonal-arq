import express from "express";
import { Request, Response, NextFunction } from "express";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";
import { ValidationError } from "./lib/Shared/errors/ValidatorError";
import { CustomError } from "./lib/Shared/errors/CustomError";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use(ExpressUserRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
        errors: err.errors,
    });
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ errorCode: err.errorCode, message: err.message });
  }

  if (err instanceof Error) {
    console.error(err.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
