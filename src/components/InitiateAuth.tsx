import React from "react";
import AuthButton from "./ui/AuthButton";
import { authStartUrl } from "../config";

const InitiateAuth: React.FC = () => {
  return (
    <div className="auth-container d-flex flex-column">
      <h2 className="mt-4 mb-5 text-center">Noki EHR Integrations</h2>
      <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center">
        <AuthButton text="Connect to Epic EHR" url={authStartUrl} disabled={false} />
        <AuthButton text="Connect to AllScripts" disabled={true} />
        <AuthButton text="Connect to System C" disabled={true} />
      </div>
    </div>
  );
};

export default InitiateAuth;