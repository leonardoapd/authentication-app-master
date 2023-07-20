import { useState, forwardRef, useImperativeHandle } from "react";
import "./FormInput.css";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const FormInput = forwardRef(({ label, name, type, onChange }, ref) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const icons = {
    email: <MailRoundedIcon className="form-group__icon" />,
    password: <LockRoundedIcon className="form-group__icon" />,
  };

  const icon = icons[type];
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  useImperativeHandle(ref, () => ({
    resetInput: () => {
      setValue("");
      setError("");
    },
  }));

  // Function to handle changes to the input value
  const handleChange = (e) => {
    const { value } = e.target;

    setValue(value);
    setError("");
    
    if (value.length === 0) {
      setError("This field is required");
    }

    if (typeof onChange === "function") {
      onChange(value, e);
    }
  };

  return (
    <div className="form-group">
      {icon}
      <input
        title={inputId}
        className="form-group__input"
        name={name}
        type={type}
        id={inputId}
        value={value}
        onChange={handleChange}
        // Using css var to change the color of the border
        style={{ "--input-border-color": error ? "#FF6B6B" : "#06D6A0" }}
      />
      <label
        className={`form-group__label ${value && "form-group__label--filled"}`}
        htmlFor={inputId}
      >
        {label}
      </label>
      {error && <p className="form-group__error">{error}</p>}
    </div>
  );
});

export default FormInput;
