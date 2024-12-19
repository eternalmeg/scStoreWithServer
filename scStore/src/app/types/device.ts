import { User } from './user';

export interface Device {
  _id?: string;
  brand: string;
  model: string;
  image: string;
  description: string;
  price: number;
  preferredList?: {
    user?: User
  }
  owner: User;
  createdAt: string;
  __v?: number;
}
