"use client";

import React, { useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [login, setLogin] = useState();

  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
