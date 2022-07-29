import User from "./models/User";
import Company from "./models/Company";
import Admin from "./models/Admin";

export interface PayloadType {
  id: string;
  iat: number;
  exp: number;
}

export interface User {
  username: String;
  email: String;
  password: String;
}

export interface ProductType {
  name: String;
  description?: String;
  productId: String;
  manufactorer: String;
  imageUrl: String;
  price: Number;
  brand: String;
  decayingTime: Date;
  warrantyAvail: Number;
  resoldVoid: Boolean;
  ownedBy: User;
}

import { Request } from "express";
export interface reqCompany extends Request {
  user: typeof User | typeof Company | typeof Admin; // or any other type
}
