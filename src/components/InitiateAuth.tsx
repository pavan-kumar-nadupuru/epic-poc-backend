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

  // https://authorization.cerner.com/tenants/2f8f5ec1-b7b8-4be5-ae27-e308284dd9c1/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?scope=patient/*.read&state=asdfasdfasdf&aud=https://fhir-myrecord-sc.cerner.com/r4/2f8f5ec1-b7b8-4be5-ae27-e308284dd9c1/&redirect_uri=http://localhost:3000/cerner/callback&client_id=c321af09-aedf-4a2f-9f28-f0a77f783bae&response_type=code
  const authUrl_cerner = 'https://authorization.cerner.com/tenants/2f8f5ec1-b7b8-4be5-ae27-e308284dd9c1/protocols/oauth2/profiles/smart-v1/personas/patient/authorize';
  const cerner_authQueryParams = querystring.stringify({
    scope: 'patient/*.read',
    state: 'asdfasdfasdf',
    aud: 'https://fhir-myrecord-sc.cerner.com/r4/2f8f5ec1-b7b8-4be5-ae27-e308284dd9c1/',
    redirect_uri: 'http://localhost:3000/cerner/callback',
    client_id: 'c321af09-aedf-4a2f-9f28-f0a77f783bae',
    response_type: 'code'
  });

  return (
    <div className="container d-flex flex-column">
      <h2 className="mt-4 mb-5 text-center">Noki EHR Integrations</h2>
      <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center">
        <AuthButton text="Connect to Epic EHR" url={redirectTo} disabled={false} />
        <AuthButton text="Connect to AllScripts" disabled={true} />
        <AuthButton text="Connect to Cerner" url={`${authUrl_cerner}?${cerner_authQueryParams}`} disabled={false}/>
      </div>
    </div>
  );
};

export default InitiateAuth;