import { IAddress } from "./IAddress";

interface ILetterData {
  sender: IAddress;
  receiver: IAddress;
  paragraphs: Array<string>;
}

export default ILetterData;
