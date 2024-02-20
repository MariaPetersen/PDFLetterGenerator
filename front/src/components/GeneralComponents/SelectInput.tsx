import React, { useEffect, useState } from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type option = {
  id: number;
  label: string;
  value: string;
};
type SelectInputProps = {
  options: Array<option>;
  onChange: (value: string) => void;
  inputLabel: string;
  initialValue?: string;
};

function SelectInput({
  options,
  onChange,
  inputLabel,
  initialValue,
}: SelectInputProps) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
    onChange(event.target.value as string);
  };

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FormControl fullWidth>
      <InputLabel id="selectInput">{inputLabel}</InputLabel>
      <Select
        id="selectInput"
        value={selectedValue}
        label={inputLabel}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
