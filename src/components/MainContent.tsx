import InitiateAuth from "./InitiateAuth";
import EpicUserFlow from "./EpicUserFlow";
import useAccessToken from "../hooks/useAccessToken";

const MainContent: React.FC = () => {
  const accessToken = useAccessToken();

  return (
    <div className="app-container d-flex justify-content-center align-items-center">
      {!accessToken ? <InitiateAuth /> : <EpicUserFlow accessToken={accessToken} />}
    </div>
  );
};

export default MainContent;