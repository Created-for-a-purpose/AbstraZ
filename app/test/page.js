'use client'
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useTwitter } from "@/hooks/useTwitter";


export default function Test(params) {
    const {data, status} = useSession();
    const {setData, followers}= useTwitter();
      
      async function handleClick () { 
        if(status === "unauthenticated") {
          signIn('twitter');
        }
        console.log(followers);
        setData(data.user.access_token);
      }
    return (
        <>
        <button onClick={handleClick}>SignIN</button>
        </>
    )
};
