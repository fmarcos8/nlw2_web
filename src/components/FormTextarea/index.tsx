import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest}>

      </textarea>
    </div>
  )
};

export default FormTextarea;