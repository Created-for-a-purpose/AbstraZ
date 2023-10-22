'use client'
import axios from "axios";


export default function Test(params) {
      
      async function handleClick () { 
        const res = await axios.post('http://localhost:3000/api/zkp', {input: {x: 18, y: 18}})
        console.log(res);
      }
    return (
        <>
        <button onClick={handleClick}>SignIN</button>
        </>
    )
};
