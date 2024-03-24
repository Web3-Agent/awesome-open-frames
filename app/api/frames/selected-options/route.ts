import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse | undefined> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body);

    if (!isValid) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    let choice: any = message?.raw?.action?.input?.text || '0';
    choice = parseInt(choice)
    switch (choice) {
        case 1:
            return new NextResponse(
                getFrameHtmlResponse({
                    input: {
                        text: 'input eg: token_name, symbol',
                    },
                    buttons: [
                        {
                            label: 'Click to Proceed',
                        },
                    ],
                    image: `https://i.imgur.com/EkN49WI.jpeg`,
                    post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/token-creation`,
                })
            );
        case 2:
            return new NextResponse(
                getFrameHtmlResponse({
                    input: {
                        text: 'input eg: token_name, symbol',
                    },
                    buttons: [
                        {
                            label: 'Click to Proceed',
                        },
                    ],
                    image: `https://i.imgur.com/2fYh26o.jpeg`,
                    post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/nft-creation`,
                })
            );
        //     break;
        // case 3:

        //     break;
        case 4:

            break;
        default:
            return new NextResponse(
                getFrameHtmlResponse({
                    buttons: [
                        {
                            label: `Invalid Input, Try Again!`,
                        },
                    ],
                    image: `https://i.imgur.com/tNdYstN.jpeg`,
                    post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
                })
            )
    }
    // if (!message.recasted) {
    //     return new NextResponse(
    //         getFrameHtmlResponse({
    //             buttons: [
    //                 {
    //                     label: `Recast & Try Again`,
    //                 },
    //             ],
    //             image: `https://i.imgur.com/dZLn1s3.jpeg`,
    //             post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
    //         })
    //     );
    // }

}

export const dynamic = "force-dynamic";