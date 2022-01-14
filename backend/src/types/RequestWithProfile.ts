import { Request, NextFunction } from "express";
import { IUserDoc } from "../models/user.model";

interface RequestWithProfile extends Request {
  profile?:
    | (IUserDoc & {
        _id: any;
      })
    | null;
}
export interface RequestHandlerWithProfile {
  (RequestWithProfile, Response, NextFunction, id_: any): Promise<void>;
}
