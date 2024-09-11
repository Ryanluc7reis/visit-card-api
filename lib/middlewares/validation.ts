import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validation(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
        type: detail.type,
      }));

      return res.status(400).json({
        errors: errorDetails,
      });
    }
    next();
  };
}
