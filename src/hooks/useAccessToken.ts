// useAccessToken.ts
import { useState, useEffect } from "react";

const useAccessToken = (): string => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("expiresIn");
    const createdAt = localStorage.getItem("createdAt");
    if (token && expiresAt && createdAt) {
      const expiresIn = parseInt(expiresAt);
      const createdAtDate = new Date(createdAt);
      const now = new Date();
      const diff = now.getTime() - createdAtDate.getTime();
      if (diff > expiresIn * 1000) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("createdAt");
        setAccessToken("");
      }
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("createdAt");
      setAccessToken("");
    }

    setAccessToken(token || "");
  }, []);

  return accessToken;
};

export default useAccessToken;
