import Web3 from "web3";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0xf126da0859c6F00bA3dBcDE7e8b14CF3Ae998221";

export async function doLogin() {
  if (!window.ethereum) throw new Error("Metamask não instalada");
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Carteira não encontrada ou permitida!");

  localStorage.setItem("wallet", accounts[0]);
  web3.eth.getBalance(accounts[0]).then(console.log("saldo"));
  web3.eth.on("message", () => {
    console.log("message");
  });

  web3.eth.on("connect", () => {
    console.log("connect");
  });

  web3.eth.on("disconnect", () => {
    console.log("dusconnect");
  });

  web3.eth.on("accountsChanged", () => {
    console.log("accoustChange");
  });

  web3.eth.on("chainChanged", () => {
    console.log("chainChanged");
  });

  return accounts[0];
}

//adicionar tweet a blockchain

export async function getContract() {
  if (!window.ethereum) throw new Error("Metamask não encontrada");
  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet");
  console.log("rodou getContract", abi, CONTRACT_ADDRESS, { from });
  return new web3.eth.Contract(abi, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text) {
  const contract = await getContract();
  return contract.methods.addTweet(text).send();
}

export async function changeUsername(newName) {
  const contract = await getContract();
  return contract.methods.changeUsername(newName).send();
}

export async function getLastTweets(page) {
  const contract = await getContract();
  const tweets = await contract.methods.getLastTweets(page).call();
  return tweets
    .map((tweet) => {
      return {
        ...tweet,
      };
    })
    .filter((tw) => tw.text !== "");
}
