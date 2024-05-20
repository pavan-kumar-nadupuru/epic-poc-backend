import InitiateAuth from "./InitiateAuth";
import SearchPatient from "./SearchPatient";
import useAccessToken from "../hooks/useAccessToken";

const MainContent: React.FC = () => {
  const accessToken = useAccessToken();

  return (
    <div className="app-container d-flex justify-content-center align-items-center">
      {!accessToken && <InitiateAuth />}
      {accessToken && <SearchPatient accessToken={accessToken} />}
    </div>
  );
};

export default MainContent;