"use client";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

const defaultContext = {
  name: "",
  followers: "",
  id: "",
  setData: () => {},
};

const TwitterContext = createContext(defaultContext);

const TwitterContextProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [followers, setFollowers] = useState("");

  const setData = async (token) => {
    console.log(id);
    if(name !== "") return;
    console.log(name);
    try {
      const responseFollowers = await axios.post(
        "http://localhost:3000/api/fetchFollowers",
        {
          token: token,
        }
      );
      console.log(responseFollowers.data.data);
      const _name = await responseFollowers.data.data.name;
      console.log()
      const _id = await responseFollowers.data.data.id;
      const _followers = await responseFollowers.data.data.public_metrics.followers_count;
      setName(_name);
      setId(_id);
      setFollowers(_followers);
    } catch (error) {
      // Handle error here, e.g., set an error state
      console.error("Error fetching followers:", error);
    }
  };
  return (
    <TwitterContext.Provider value={{ id, name, followers, setData }}>
      {children}
    </TwitterContext.Provider>
  );
};

export { TwitterContext, TwitterContextProvider };
