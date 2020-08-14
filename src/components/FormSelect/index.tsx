import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface OptionsSelect {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<OptionsSelect>;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest} >
        <option value="" disabled hidden>Selecione uma Opção</option>
        {options.map((option, i) => {
          return <option key={i} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  )
};

export default FormSelect;