import React, { useState } from "react";
import { isEmpty, isThaiOnly } from "../utils/validUtils"; // Replace "./utils" with the actual path to your utilities file

// Reusable input validator component
const InputValidator = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{isEmpty(inputValue) && isThaiOnly(inputValue) ? " " : `Invalid ${label}`}</p>
    </div>
  );
};

// Email validator component
const EmailValidator = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  // ...

  return (
    <InputValidator
      label="Email"
      value={value}
      onChange={onChange}
    />
  );
};

// English validator component
const EnglishValidator = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  // ...

  return (
    <InputValidator
      label="English"
      value={value}
      onChange={onChange}
    />
  );
};

// Thai validator component
const ThaiValidator = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  // ...

  return (
    <InputValidator
      label="Thai"
      value={value}
      onChange={onChange}
    />
  );
};

export { InputValidator, EmailValidator, EnglishValidator, ThaiValidator };
