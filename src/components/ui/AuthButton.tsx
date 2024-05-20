// AuthButton.tsx
import React from "react";

interface AuthButtonProps {
  text: string;
  url?: string;
  disabled: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, url, disabled }) => {
  const handleClick = () => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <button className="btn btn-primary mb-3" onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default AuthButton;