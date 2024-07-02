
import { useAccount } from "@starknet-react/core";
import React, { useState } from 'react';

import { Signature } from "starknet";
import { Button } from "../ui/Button";
import { parseSignature } from "../../utils/walletSignature";

const exampleData = {
    types: {
        StarkNetDomain: [
            { name: "name", type: "felt" },
            { name: "version", type: "felt" },
            { name: "chainId", type: "felt" },
        ],
        Person: [
            { name: "name", type: "felt" },
            { name: "wallet", type: "felt" },
        ],
        Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person" },
            { name: "contents", type: "felt" },
        ],
    },
    primaryType: "Mail",
    domain: {
        name: "Starknet Mail",
        version: "1",
        chainId: "0x534e5f5345504f4c4941",
    },
    message: {
        from: {
            name: "Cow",
            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
            name: "Bob",
            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
    },
};

export default function MyComponent() {
    const { account } = useAccount();
    const [signedMessage, setSignedMessage] = useState<Signature | null>(null);

    const handleSignMessage = async () => {
        if (account) {
            try {
                const res: Signature = parseSignature(await account.signMessage(exampleData));
                setSignedMessage(res);
            } catch (error) {
                console.error('Error signing message:', error);
            }
        }
    };

    return (
        <div>
            <Button
                className="w-full"
                onClick={handleSignMessage}
                disabled={!account}
            >
                Sign Message
            </Button>
            {signedMessage && (
                <div className="mt-4 p-2 border border-gray-200 rounded">
                    <strong>Signed Message:</strong>
                    <pre>{JSON.stringify(signedMessage, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
