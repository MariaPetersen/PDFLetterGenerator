import { IAddress } from "../interfaces/IAddress";
import { IResignationLetter } from "../interfaces/IResignationLetter";

const initialAddress: IAddress = {
  firstName: "",
  lastName: "",
  street: "",
  zip: "",
  town: "",
  country: "",
};

const initialResignationLetterData: IResignationLetter = {
  handInType: "",
  receiverGender: "",
  jobFunction: "",
  startOfContract: "",
  notice: "",
  dispenseNotice: false,
};

export { initialAddress, initialResignationLetterData };
