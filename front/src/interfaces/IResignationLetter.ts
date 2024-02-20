import { ILetterData } from "./ILetterData";
import { Dayjs } from "dayjs";

export interface IResignationLetter extends ILetterData {
  handInType: string;
  receiverGender: string;
  jobFunction: string;
  startOfContract: Dayjs | null | string,
  notice: string;
  dispenseNotice: boolean;
}
