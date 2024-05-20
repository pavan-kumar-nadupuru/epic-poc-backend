import { useEffect, useState } from "react";
import InitiateAuth from "./InitiateAuth";
import SearchPatient from "./SearchPatient";

const MainContent: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string>("");

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);
        setAccessToken(urlParam.get("accesstoken") || "");
    });

    return (
        <div className="app-container d-flex justify-content-center align-items-center">
            {!accessToken && <InitiateAuth />}
            {accessToken && <SearchPatient accessToken={accessToken} />}
        </div>
    );
}


export default MainContent;