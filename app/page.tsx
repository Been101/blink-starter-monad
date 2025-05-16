// src/app/page.tsx

"use client";

import {
  Blink,
  useBlink,
  useActionsRegistryInterval,
} from "@dialectlabs/blinks";

import "@dialectlabs/blinks/index.css";

import { useEvmWagmiAdapter } from "@dialectlabs/blinks/hooks/evm";

import { ConnectKitButton, useModal } from "connectkit";
// import { Donate } from "./components/Donate";
import "./page.css";

export default function Home() {
  // Actions registry interval
  useActionsRegistryInterval();

  // ConnectKit modal
  const { setOpen } = useModal();

  // Wagmi adapter, used to connect to the wallet
  const { adapter } = useEvmWagmiAdapter({
    onConnectWalletRequest: async () => {
      setOpen(true);
    },
  });

  // Action we want to execute in the Blink
  const { blink, isLoading } = useBlink({
    url: "evm-action:https://blink-starter-monad.vercel.app/api/actions/donate-mon",
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <ConnectKitButton />
      <div className="flex flex-row w-full">
        {/* <div className="w-1/2 lg:px-4 lg:p-8">
          <Donate />
        </div> */}
        <div className="w-1/2 lg:px-4 lg:p-8">
          {isLoading || !blink ? (
            <span>Loading</span>
          ) : (
            // Blink component, used to execute the action
            <Blink
              blink={blink}
              adapter={adapter}
              securityLevel="all"
              stylePreset="x-dark"
            />
          )}
        </div>
      </div>
    </main>
  );
}
