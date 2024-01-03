"use client";
import {
  changeMessage,
  get_balance,
  get_message,
} from "@/services/web3-config";
import Head from "next/head";
import { useEffect, useState } from "react";

const Timeline = () => {
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [username, setUsername] = useState<string>("");

  const pegaNome = (e: any) => {
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

  function getMessage() {
    const mes: any = get_message();
    setMessage(mes);
  }

  function getBalance() {
    const message: any = get_balance();
    setBalance(message);
  }

  useEffect(() => {
    void getBalance();
    void getMessage();
  }, []);

  return (
    <>
      <Head>
        <title>WEB3.JS</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <hr />
      <div className="cards" style={{ display: "flex" }}>
        <div
          className="card"
          style={{
            border: "solid 1px #DDD",
            borderRadius: "8px",
            padding: "15px",
            margin: "20px",
          }}
        >
          <h3>Carteira</h3>
          <p>carteira conectada: xxxxxxxxxxxxxxxxxxxxxx</p>
          <div className="saldo">seu saldo é de {balance}</div>
        </div>

        <div
          className="card"
          style={{
            border: "solid 1px #DDD",
            borderRadius: "8px",
            padding: "15px",
            margin: "20px",
          }}
        >
          <h3>Mensagem atual do contrato</h3>
          <p>{message}</p>
          <div className="mensagem">{message}</div>
        </div>
      </div>
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
