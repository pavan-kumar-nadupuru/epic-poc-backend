import React from "react";
import AuthButton from "./ui/AuthButton";
import querystring from "querystring";


const authUrl: string = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize';
const clientId: string = 'b1269f3e-4fa4-4acd-aedf-9ebd8014c393';
const redirectUrl: string = 'http://localhost:3000/callback';
const fhirAud: string = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4';


const InitiateAuth: React.FC = () => {
  const authQueryParams = querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'openid profile patient/*.read user/*.read system/Appointment.read offline_access',
    state: 'some_random_state',
    aud: fhirAud
  });
  const redirectTo = `${authUrl}?${authQueryParams}`;
  return (
    <div className="auth-container d-flex flex-column">
      <h2 className="mt-4 mb-5 text-center">Noki EHR Integrations</h2>
      <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center">
        <AuthButton text="Connect to Epic EHR" url={redirectTo} disabled={false} />
        <AuthButton text="Connect to AllScripts" disabled={true} />
        <AuthButton text="Connect to System C" disabled={true} />
      </div>
    </div>
  );
};

export default InitiateAuth;