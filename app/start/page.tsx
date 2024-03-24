import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import React from "react";

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: "Recast & Start",
        },
    ],
    image: `https://i.imgur.com/dZLn1s3.jpeg`,
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
});

export const metadata: Metadata = {
    title: "Web3Agent Token's Frames",
    description: "AI power : Re-define the Experience",
    openGraph: {
        title: "Web3Agent Token's Frames",
        description: "Re-define the Experience",
        images: [
            `https://i.imgur.com/dZLn1s3.jpeg`,
        ],
    },
    other: {
        ...frameMetadata,
    },
};

export default function Page() {
    return (
        <>
            <h1>Web3Agent Frame Creation</h1>
        </>
    );
}