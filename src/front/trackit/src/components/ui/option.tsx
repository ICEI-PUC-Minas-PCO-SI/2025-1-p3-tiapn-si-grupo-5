import React from "react";

type OptionProps = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  cursor?: string;
};

const Option: React.FC<OptionProps> = ({
  value,
  label,
  icon,
  backgroundColor = "#FFFFFF",
  color = "black",
  fontFamily = "Poppins",
  fontSize = "14px",
  cursor = "default",
}) => {
  return (
    <option
      value={value}
      style={{
        backgroundColor,
        color,
        fontFamily,
        fontSize,
        cursor,
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {icon} {label}
    </option>
  );
};

export default Option;
