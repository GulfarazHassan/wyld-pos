import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validateAuth = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};
