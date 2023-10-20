import { useContext } from "react";
import { TwitterContext } from "@/context/TwitterContext";

export const useTwitter = () => {
    const context = useContext(TwitterContext);
    return context;
}