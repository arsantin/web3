"use client";

import {
  addTweet,
  changeUsername,
  getLastTweets,
} from "@/services/web3-config";
import Head from "next/head";
import { useEffect, useState } from "react";

const Timeline = () => {
  const [message, setMessage] = useState("");
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");

  const pegaNome = (e: any) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  function enviaNome() {
    alert(username);
    changeUsername(username)
      .then((result) => {
        console.log(result);
        setMessage("user alterado!");
      })
      .catch((e) => console.log(e));
  }

  const pegaTweet = (e: any) => {
    setMessage(e.target.value);
  };
  function enviaTweet() {
    setMessage("Enviando tweet");
    addTweet(message)
      .then((result) => {
        console.log(result);
        setMessage("Tweet enviado!");
      })
      .catch((e) => console.log(e));
  }

  async function loadTweets(page = 1) {
    try {
      const results = await getLastTweets(page);
      setTweets(results);
      console.log("TWEETS", results);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadTweets(1);
  }, []);

  return (
    <>
      <Head>
        <title>Timeline!!!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>ok</h1>
      {tweets &&
        tweets.length &&
        tweets.map((tweet: any) => {
          return (
            <div key={Math.random()}>
              <div className="texto">texto: {tweet?.text}</div>
              <div className="autor">autor: {tweet.username}</div>
            </div>
          );
        })}
      <label htmlFor="tweet">Envie sua mensagem</label>
      <textarea
        onChange={(e: any) => pegaTweet(e)}
        name="tweet"
        id=""
      ></textarea>
      <input
        type="text"
        onChange={(e: any) => pegaNome(e)}
        name="tweet"
        id=""
      />
      <button onClick={enviaNome}>MUDA NOME</button>

      <button onClick={enviaTweet}>ENVIAR</button>

      <h2>tweets</h2>
      <></>
    </>
  );
};

export default Timeline;
