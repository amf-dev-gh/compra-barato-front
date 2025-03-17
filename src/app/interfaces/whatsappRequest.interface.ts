import { Product } from "./product.interface";

export interface WhatsAppRequest {
  products: Product[],
  username: string,
  phoneNumber: string;
}