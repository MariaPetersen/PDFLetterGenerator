import { ILetterData } from "./ILetterData";

export interface IResignationLetter extends ILetterData {
  handInType: string;
  receiverGender: string;
  jobFunction: string;
  startOfContract: string;
  notice: string;
  dispenseNotice: boolean;
}
