export interface PayloadType {
  id: String;
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

interface Company {
  storeName: String;
  companyId: String;
  email: String;
  password: String;
  phoneNumber: Number;
}

interface UserType {
  firstname: String;
  lastname: String;
  email: String;
  userId: String;
  phonenumber: number;
}

import { Request } from "express";
export interface reqCompany extends Request {
  user: Company; // or any other type
}

export interface reqUser extends Request {
  user: UserType; // or any other type
}
