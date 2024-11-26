import {Device} from './device'

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdDevice?: Device[];
  preferDevice?: Device[];
}
