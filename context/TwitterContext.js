'use client'
import { useState } from "react";
import { createContext } from "react";

const defaultContext = {
  token: '',
  name: '',
  followers: '',
  setData: () => {},
};

const TwitterContext = createContext(defaultContext);

const TwitterContextProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [followers, setFollowers] = useState('');

  const setData = async (token, name) => {
    setToken(token);
    setName(name);
    const responseFollowers = await fetch(
      "https://api.twitter.com/1.1/followers/list.json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const followers = await responseFollowers.json();
    setFollowers(followers);
  };
  return (
    <TwitterContext.Provider value={{ token, name, followers, setData }}>
      {children}
    </TwitterContext.Provider>
  );
};

export { TwitterContext, TwitterContextProvider };