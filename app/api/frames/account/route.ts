import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);


    if (!isValid) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    if (!message.recasted) {
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: `Recast & Try Again`,
                    },
                ],
                image: `https://i.imgur.com/dZLn1s3.jpeg`,
                post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
            })
        );
    }

    return new NextResponse(
        getFrameHtmlResponse({
            input: {
                text: 'Choose anyone option from above',
            },
            buttons: [
                {
                    label: 'Click to Proceed',
                },
            ],
            image: `https://i.imgur.com/tNdYstN.jpeg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
            post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/selected-options`,
        })
    );
}

export const dynamic = "force-dynamic";