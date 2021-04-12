//TODO make this more readable, map it on back-end?
export interface ProductType {
  ID_Product: number;
  name_p: string;
  price: string;
  description_p: string;
  tax_p: number;
  color?: any;
  size: string;
  ID_Category: number;
}

export type CartProductType = ProductType & { quantity: number };

export type AddToCartPayload = {
  itemCode: number;
  quantity: number;
};
