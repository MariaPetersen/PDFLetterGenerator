const letterTemplates = {
  FORMAL_LETTER: "formalLetterTemplate.ejs",
  RESIGNATION_LETTER: "resignationLetterTemplate.ejs",
};

const getLetterTemplateForType = (type: string) => {
  switch (type) {
    case "formalLetter":
      return letterTemplates.FORMAL_LETTER;
    case "resignationLetter":
      return letterTemplates.RESIGNATION_LETTER;
    default:
      return;
  }
};

module.exports = { letterTemplates, getLetterTemplateForType };
