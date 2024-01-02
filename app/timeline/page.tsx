"use client";

import { changeMessage, get_message } from "@/services/web3-config";
import Head from "next/head";
import { useState } from "react";

const Timeline = () => {
  const [message, setMessage] = useState("");
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState<string>("");

  const pegaNome = (e: any) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  function enviaNome() {
    alert(username);
    changeMessage(username)
      .then((result) => {
        console.log("result", result);
        setMessage("contrato alterado!");
      })
      .catch((e) => console.log(e));
  }

  async function getMessage() {
    const mes: any = await get_message();
    setMessage(mes);
  }

  return (
    <>
      <Head>
        <title>Timeline!!!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <hr />
      <button onClick={getMessage}>GET MESSAGE</button>
      <h1>{message}</h1>
      <hr />
      <label htmlFor="tweet">Novo texto: </label>
      <input
        type="text"
        onChange={(e: any) => pegaNome(e)}
        name="tweet"
        id=""
      />

      <hr />
      <button onClick={enviaNome}>ENVIAR NOVA MENSAGEM</button>
      <h2></h2>
      <></>
    </>
  );
};

export default Timeline;
