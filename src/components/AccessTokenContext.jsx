import React, { useState, useEffect } from "react";

const AccessTokenContext = React.createContext();

const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [doctorId, setDoctorId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }

    if (doctorId) {
      localStorage.setItem("userId", doctorId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [accessToken, doctorId]);

  return (
    <AccessTokenContext.Provider
      value={{
        accessToken,
        setAccessToken,
        doctorId,
        setDoctorId,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};

export { AccessTokenProvider, AccessTokenContext };
