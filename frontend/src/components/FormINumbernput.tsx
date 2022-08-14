import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Badge } from "@chakra-ui/react";
import React from "react";

type FormInputProps = {
  onChange: (e: any) => void;
  label: string;
  value: number;
  min: number;
  max: number;
  required?: boolean;
}
const FormNumberInput: React.FC<FormInputProps> = ({ onChange, label, value, min, max, required }) => {
  return (
    <FormControl>
      <FormLabel>{label} {required && (
        <Badge colorScheme="red" mx={2}>
          必須
        </Badge>
      )}</FormLabel>
      <NumberInput
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export default FormNumberInput;