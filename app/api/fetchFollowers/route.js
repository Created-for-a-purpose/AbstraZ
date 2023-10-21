// import axios from "axios";

// export default async function handler(req, res) {
//     const token  = req.body.token;
//     try {
//         const responseFollowers = await axios.get(
//             "https://api.twitter.com/1.1/followers/list.json",
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         console.log('json', responseFollowers.data);
//         return res.status(200).json(responseFollowers.data);
//     } catch (error) {
//         console.error('Error fetching followers:', error);
//         return res.status(500).json({ error: 'Error fetching followers' });
//     }
//     res.status(200).json('It works!');
// }

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { token } = await req.json();

  try {
    const responseFollowers = await axios.get(
      "https://api.twitter.com/2/users/me?user.fields=public_metrics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(responseFollowers.data);
  } catch (error) {
    console.error("Error fetching followers:", error);
    return NextResponse.json({ error: "Error fetching followers", error : error });
  }
}
