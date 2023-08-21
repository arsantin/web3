"use client";

import Head from "next/head";
import Image from "next/image";
import { doLogin } from "../services/web3-config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  function connectWallet() {
    doLogin()
      .then((wallet) => push("/timeline"))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      push("/timeline");
    }
  }, []);
  return (
    <>
      <Head>
        <title>CRypto!!!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Crypto!!!!</h1>
        <button onClick={connectWallet}>
          <Image
            src="/connect-metamask.png"
            width={300}
            height={50}
            alt="conectar com Metamask"
          />
        </button>
      </main>
    </>
  );
}
