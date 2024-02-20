import { IAddress } from "./IAddress";

export interface ILetterData {
  sender: IAddress;
  receiver: IAddress;
  type: string;
  object?: string;
  paragraphs?: Array<string>;
  greeting?: string;
  handInType?: string;
  receiverGender?: string;
  jobFunction?: string;
  startOfContract?: string;
  notice?: string;
  dispenseNotice?: boolean;
}
