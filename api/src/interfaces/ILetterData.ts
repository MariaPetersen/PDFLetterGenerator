import { IAddress } from "./IAddress";

export interface ILetterData {
  sender: IAddress;
  receiver: IAddress;
  object: string;
  paragraphs: Array<string>;
  greeting: string;
}
