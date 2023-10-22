import { NextResponse } from "next/server";



export async function zkp(request) {

    const { input } = await request.json();

    try {
        
        // const {verifyZkKyc} = useNoir()
        // const verified = await verifyZkKyc(input)
        return NextResponse.json(input);
    } catch (error) {
        console.error("Error fetching followers:", error);
        return NextResponse.json({ error: "Error fetching followers", error: error });
    }
}
