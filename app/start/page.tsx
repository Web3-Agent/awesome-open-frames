import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import React from "react";

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: "Cast & Start",
        },
    ],
    image: `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
    postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frames/account`,
});

export const metadata: Metadata = {
    title: "Web3Agent Token's Frames",
    description: "Re-define the Experience",
    openGraph: {
        title: "Web3Agent Token's Frames",
        description: "Re-define the Experience",
        images: [
            `https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Images44m-1684388550673.jpg?mode=crop&crop=faces&ar=2:1?width=1920&q=75`,
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