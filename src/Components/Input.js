import React from "react";

export default function Input(props) {
  const { placeholder, type, value, onChange, onKeyPress, } = props;
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        className="nameInput"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  );
}
