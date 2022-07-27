interface formInputProp {
  type: string;
  label: string;
  id: string;
  required?: boolean;
}

interface nftProp {
  productName: string;
  purchaseDate: string;
  warrantyType: string;
  productId: string;
}

<<<<<<< HEAD
interface ContextAppType {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

interface Props {
  children: ReactNode;
}

interface appState {
  accessToken: String;
=======
interface products {
  productId: string;
  productName: string;
  category: string;
  warrantyAvial: boolean;
  warrantyType?: string;
  warrantyPeriod?: string;
  sold: boolean;
>>>>>>> f382cdf710d50631ba3b0c3a931f37e2c2161708
}
