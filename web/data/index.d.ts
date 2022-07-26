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

interface products {
  productId: string;
  productName: string;
  category: string;
  warrantyAvial: boolean;
  warrantyType?: string;
  warrantyPeriod?: string;
  sold: boolean;
}
