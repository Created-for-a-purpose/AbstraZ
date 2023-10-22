import { NextResponse } from "next/server";

export function middleware() {
    // retrieve the current response
    const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Cross-Origin-Embedder-Policy', 'require-corp')
    res.headers.append('Cross-Origin-Opener-Policy', 'same-origin')

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/join-dao/',
}