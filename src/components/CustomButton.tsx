import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  background: string;
  color: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  color,
  background,
}) => {
  return (
    <button
      style={{
        backgroundColor: background,
        padding: "8px 29px",
        borderRadius: "12px",
        color: color,
        borderColor: color,
        outline: "none",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
