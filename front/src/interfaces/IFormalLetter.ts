import { ILetterData } from "./ILetterData";

export interface IFormalLetter extends ILetterData {
  object: string;
  paragraphs: Array<string>;
  greeting: string;
}
