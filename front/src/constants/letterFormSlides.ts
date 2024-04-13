const letterFormSlides = [
  "sender",
  "receiver",
  "object",
  "content",
  "greeting"
];

interface LetterFormSlidesTitles {
  [key: string]: string
}

const letterFormSlidesTitles: LetterFormSlidesTitles = {
  sender: "Quel est l'expéditeur ?",
  receiver: "Quel est le destinaire",
  object: "Ecrivez l'objet de la lettre",
  content: "Ecrivez le corps de la lettre",
  greeting: "Choisissez une formule de politesse"
};

const resignationLetterSlides = [
    "sender",
    "receiver",
    "type",
    "gender",
    "job",
    "startDate",
    "notice"
    ]

const resignationLetterSlidesTitles: LetterFormSlidesTitles = {
  sender: "Quel est l'expéditeur ?",
  receiver: "Quel est le destinaire",
  type: "Indiquez le type de remise",
  gender: "Quel est le gendre du destinataire",
  job: "Quelle fonction occupez-vous ?",
  startDate: "Quelle est la date de début du contrat",
  notice: "Indiquez la période de préavis et si vous souhaitez en demander une dispense"  
};

export { letterFormSlides, letterFormSlidesTitles, resignationLetterSlides, resignationLetterSlidesTitles };
