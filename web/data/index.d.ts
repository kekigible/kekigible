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
  productId: string;
  productName: string;
  category: string;
  warrantyAvial: boolean;
  warrantyType: string;
  warrantyPeriod?: string;
  sold: boolean;
  purchaseDate?: string;
}

interface collection {
  collectionName: string;
  category: string;
  warrantyAvail: boolean;
  warrantyType?: string;
  warrantyPeriod?: string;
  amountRemaining: number;
  productUrl?: string;
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
