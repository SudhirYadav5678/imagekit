import { getUploadAuthParams } from "@imagekit/next/server";


export async function GET() {
    try {
        const authenticationParameters = getUploadAuthParams({
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
        })
        return new Response(JSON.stringify({
            authenticationParameters,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        }));
    } catch (error) {
        console.error("Error generating authentication parameters:", error);
        return new Response("Error generating authentication parameters", { status: 500 });
    }
}