import Web3 from "web3";

import abi from "./abi.json";
const CONTRACT_ADDRESS = "0x8A033CBb7eF4f743A5f10D76d83BDc8D0605D5b3";

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
  console.log(web3);
  const from = localStorage.getItem("wallet");
  console.log("rodou getContract", abi, CONTRACT_ADDRESS, { from });
  return new web3.eth.Contract(abi, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text) {
  const contract = await getContract();
  return contract.methods.addTweet(text).send();
}

export async function get_message() {
  const contractMessage = await getContract();
  return contractMessage.methods.get_message().call();
}

export async function sendTransfer() {
  const walletFrom = localStorage.getItem("wallet");
  const web3 = new Web3(window.ethereum);

  // using the callback
  await web3.eth
    .sendTransaction({
      from: walletFrom,
      to: "0xBbBA97e686900ba326DD467325b44610DeB99F8E",
      value: Web3.utils.toWei("0.0000000000000000000001", "ether"),
      gas: "21000",
    })
    .then((resp) => {
      resp;
    });
}

export async function get_balance() {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  return web3.eth
    .getBalance(accounts[0])
    .then((res) => web3.utils.fromWei(res, "ether"));
}

export async function changeMessage(newName) {
  const contract = await getContract();
  return contract.methods.changeMessage(newName).send();
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
