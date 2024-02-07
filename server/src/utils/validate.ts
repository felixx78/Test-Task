import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export default function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      return res
        .status(400)
        .json(`${err.issues[0].path[1]} ${err.issues[0].message}`);
    }
  };
}
