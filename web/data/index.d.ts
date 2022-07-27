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

interface ContextAppType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  isLogedIn: () => void;
  requestLogin: ({ password: string, email: string }) => void;
}

interface Props {
  children: ReactNode;
}

interface appState {
  accessToken: String;
}
