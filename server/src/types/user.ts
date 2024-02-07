import { Request } from "express";

export type User = {
  id: string;
  username: string;
};

export interface UserRequest extends Request {
  user?: User;
}
