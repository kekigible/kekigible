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
