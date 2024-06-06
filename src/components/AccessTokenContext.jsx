import React, { createContext, useState } from "react";

export const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  return (
    <AccessTokenContext.Provider
      value={{ accessToken, setAccessToken, doctorId, setDoctorId }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};
