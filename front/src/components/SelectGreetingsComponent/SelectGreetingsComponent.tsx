import React from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type SelectGreetingsComponentProp = {
  selectedGreeting: string;
  setSelectedGreeting: React.Dispatch<React.SetStateAction<string>>;
};

function SelectGreetingsComponent({
  selectedGreeting,
  setSelectedGreeting,
}: SelectGreetingsComponentProp) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedGreeting(event.target.value as string);
  };

  const greetings = [
    {
      id: 1,
      type: "polite",
      greeting:
        "Je vous prie d'agréer l'expression de mes salutations distinguées.",
    },
    {
      id: 2,
      type: "polite",
      greeting: "Je vous adresse l'assurance de mes sentiments respectueux.",
    },
  ];

  return (
    <FormControl fullWidth>
      <InputLabel id="greetingInput">Formule de politesse</InputLabel>
      <Select
        id="greetingInput"
        value={selectedGreeting}
        label="Formule de politesse"
        onChange={handleChange}
      >
        {greetings.map((greeting) => (
          <MenuItem value={greeting.greeting} key={greeting.id}>
            {greeting.greeting}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectGreetingsComponent;
