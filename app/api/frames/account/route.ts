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

    // if (!message.recasted) {
    //     return new NextResponse(
    //         getFrameHtmlResponse({
    //             buttons: [
    //                 {
    //                     label: `Recast & Try Again`,
    //                 },
    //             ],
    //             image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
    //             post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
    //         })
    //     );
    // }

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
            image: `https://i.imgur.com/whKwtBW.png?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
            post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/selected-options`,
        })
    );
}

export const dynamic = "force-dynamic";