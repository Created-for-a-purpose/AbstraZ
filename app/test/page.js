'use client'

import { useSession } from "next-auth/react";
import { useTwitter } from "@/hooks/useTwitter";


export default function Test(params) {
    const {followers, setData} = useTwitter();
    const {data} = useSession();
    async function handleClick() {
        // const res = await fetch("http://localhost:3000/api/auth/signin", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         callbackUrl: "http://localhost:3000/"
        //     })
        // });
        // console.log(res);
        console.log(data.user);
        setData(data.user.access_token, data.user.name);
    }
    return (
        <>
        <button onClick={handleClick}>SignIN</button>
        </>
    )
};
