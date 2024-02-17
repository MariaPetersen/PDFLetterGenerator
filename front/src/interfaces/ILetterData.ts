import { IAddress } from "./IAddress";

interface ILetterData {
  sender: IAddress;
  receiver: IAddress;
  object: string;
  paragraphs: Array<string>;
  greeting: string;
}

export default ILetterData;
