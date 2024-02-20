import { IAddress } from "./IAddress";

export interface ILetterData {
  sender?: IAddress;
  receiver?: IAddress;
  type?: string;
  id?: string;
}
