"use client";
import {
  changeMessage,
  get_balance,
  get_message,
  sendTransfer,
} from "@/services/web3-config";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Timeline = () => {
  const [wallet, setWallet] = useState("");
  const [payment, setPayment] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [username, setUsername] = useState<string>("");

  const pegaNome = (e: any) => {
    setUsername(e.target.value);
  };

  function enviaNome() {
    changeMessage(username).then((result) => {
      toast.success("contrato alterado!");
    });
  }

  function enviaPgto() {
    const res: any = sendTransfer().then((x) => {
      console.log("pagamento realizado!", x);
    });
  }

  function getMessage() {
    const mes: any = get_message();
    setMessage(mes);
  }

  function getBalance() {
    const balance: any = get_balance();
    setBalance(balance);
  }

  useEffect(() => {
    const wallet: any = localStorage.getItem("wallet");
    setWallet(wallet);
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
          <p>carteira conectada: {wallet}</p>
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
          <p>
            <i>{message}</i>
          </p>
          <label htmlFor="tweet">Novo texto: </label>
          <input
            type="text"
            onChange={(e: any) => pegaNome(e)}
            name="tweet"
            id=""
          />
          <button onClick={enviaNome}>ENVIAR NOVA MENSAGEM</button>
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
          <h3>Fazer transferência:</h3>
          <label htmlFor="tweet">Endereço do receptor:</label>
          <input
            type="text"
            //   onChange={(e: any) => pegaNome(e)}
            name="tweet"
            placeholder="endereço da carteira"
            id=""
          />
          <input
            type="number"
            //   onChange={(e: any) => pegaNome(e)}
            name="tweet"
            placeholder="valor a ser tranferido"
            id=""
          />
          pgto:{payment}
          <button onClick={enviaPgto}>TRANSFERIR</button>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#3399ff",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ff0023",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default Timeline;
