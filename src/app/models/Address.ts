import { User } from "./User";

export interface Address {
    id: number;
    userId: number;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    user?: User;
}
  