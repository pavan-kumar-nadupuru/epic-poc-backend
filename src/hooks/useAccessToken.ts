// useAccessToken.ts
import { useState, useEffect } from "react";

const useAccessToken = (): string => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setAccessToken(urlParam.get("accesstoken") || "");
  }, []);

  return accessToken;
};

export default useAccessToken;