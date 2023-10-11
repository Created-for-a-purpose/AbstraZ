import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useAuthKit = () => {
    const context = useContext(AuthContext);
    return context;
}