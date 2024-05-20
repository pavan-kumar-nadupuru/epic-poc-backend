import React from "react";

const InitiateAuth: React.FC = () => {
    const authStartUrl = 'http://localhost:3000/auth';

    return (
        <div className="auth-container d-flex flex-column">
            <h2 className="mt-4 mb-5 text-center">Noki EHR Integrations</h2>
            <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center">
                <button className="btn btn-primary mb-3" onClick={(_event) => {
                    window.location.href = authStartUrl;
                }}>Connect to Epic EHR</button>
                <button disabled className="btn btn-primary mb-3">Connect to AllScripts</button>
                <button disabled className="btn btn-primary">Connect to System C</button>
            </div>
        </div>
    );
}

export default InitiateAuth;