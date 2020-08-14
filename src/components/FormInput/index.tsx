import React, { InputHTMLAttributes } from "react";

import "./styles.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  )
};

export default FormInput;