import { IAddress } from "./IAddress";

export interface ILetterData {
  sender: IAddress;
  receiver: IAddress;
  paragraphs: Array<string>;
}
