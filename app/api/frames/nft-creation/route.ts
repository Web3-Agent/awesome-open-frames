import {
    FrameRequest,
    getFrameHtmlResponse,
    getFrameMessage,
} from "@coinbase/onchainkit";
import { toBase64 } from 'openai/core';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { message } = await getFrameMessage(body);

    if (!message) {
        return new NextResponse("Invalid Frame message", { status: 400 });
    }

    let input: any = message?.raw?.action?.input?.text || '0';
    input = input.split(",").map((item: string) => item.trim());

    if (input?.length < 2) {
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
                image: `https://i.imgur.com/dZLn1s3.jpeg`,
                post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/nft-creation`,
            })
        );
    }
    const code = `
    // SPDX-License-Identifier: MIT
    // Compatible with OpenZeppelin Contracts ^5.0.0
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract ${input[0]}Token is ERC721, Ownable {
    constructor(address initialOwner)
        ERC721("${input[0]}", "${input[1]}")
        Ownable(initialOwner)
    {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
    }`

    const base = toBase64(code)
    const link = `https://remix.ethereum.org/?#code=${base}&autoCompile=true&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js`
    const downloadLink = `http://localhost:3000/api/frames/download?code=${code}`
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Start Again!',
                },
                {
                    label: 'Hardhat',
                    action: "link",
                    target: downloadLink
                },
                {
                    label: 'Remix',
                    action: 'link',
                    target: link
                },
            ],
            image: `https://i.imgur.com/2fYh26o.jpeg`,
            post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/start`,
        })
    );
}


export const dynamic = "force-dynamic";