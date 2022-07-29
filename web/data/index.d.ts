import { Url } from "url";

interface formInputProp {
  type: string;
  label: string;
  id: string;
  required?: boolean;
  name?: string;
}

interface nftProp {
  productName: string;
  purchaseDate: string;
  warrantyType: string;
  productId: string;
}

interface products {
  owner: string;
  productId: string;
  description: string;
  collectionId: String;
  productName: string;
  category: string;
  warrantyAvail: boolean;
  warrantyType: string;
  warrantyPeriod?: string;
  sold: boolean;
  purchaseDate?: string;
  createdAt: string;
  modifiedAt: string;
  nftImageUrl: string;
  nftLoyaltyImageUrl: string;
  nftSoulBound: boolean;
  nftPurchasable: number;
  productUrl: Url;
}

interface collections {
  name: String;
  collectionId: String;
  author?: String;
  description: String;
  createdAt: string;
  modifiedAt?: string;
  nftImageUrl: String;
  nftLoyaltyImageUrl?: String;
  nftSoulBound: boolean;
  nftPurchasable?: number;
  loyaltyCoinAlloted?: number;
  category: string;
  warrantyAvail: boolean;
  warrantyType: string;
  warrantyPeriod?: string;
  productUrl: url | string;
}

interface ticket {
  ticketTitle: string;
  ticketDescription: string;
  ticketIdentifier: string;
  createdAt: string;
  modifiedAt: string;
  status: string;
}

interface ContextAppType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  isLogedIn: () => void;
  requestLogin: (body: auth) => void;
  createProduct: (body: any) => void;
}

interface Props {
  children: ReactNode;
}

interface appState {
  accessToken: String;
}

interface auth {
  password: string;
  email: string;
  entity: String;
}
