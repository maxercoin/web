import Web3 from "web3";
import { minABI } from "./abi";
import _ from "lodash";
import { Transaction } from "ethereumjs-tx";
import { ParaSwap } from "paraswap";
// var Common = require('ethereumjs-common').default;
// import {default as Cinni} from 'ethereumjs-common'
import axios from "axios";
let pancakeSwapAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const testnet = "https://mainnet.infura.io/v3/3be3e1343a95427ba6f96e5e1d38e7cd";
const mainnet = "https://mainnet.infura.io/v3/3be3e1343a95427ba6f96e5e1d38e7cd";
const web3 = new Web3("https://mainnet.infura.io");
const bscMainnetRpc = "https://bsc-dataseed.binance.org/";
const bscUsdt = "0x55d398326f99059fF775485246999027B3197955";
const ethUSDTMainnet = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

export async function generateAccount(password) {
  let account = web3.eth.accounts.create(web3.utils.randomHex(32));
  // let wallet = web3.eth.accounts.wallet.add(account);
  // let keystore = wallet.encrypt(web3.utils.randomHex(32));
  const { address } = account;
  let keystoreJsonV3 = account.encrypt(password);
  return { address, keystoreJsonV3 };
}

export async function deecrtyptAccountPrivateKey(key, password) {
  let pKey = web3.eth.accounts.decrypt(key, password);
  // let accountRecovered = web3.eth.accounts.privateKeyToAccount(pKey);
  return pKey;
}

export async function getAllBalances(address) {
  const networks = ["bsc", "eth"];
  const bscTokensContracts = [{ name: "USDT", address: bscUsdt, decimals: 18 }];
  const ethTokensContracts = [
    { name: "USDT", address: ethUSDTMainnet, decimals: 18 },
  ];
  const tokens = networks.map(async (v) => {
    if (v === "bsc") {
      const web = new Web3(bscMainnetRpc);
      const innateToken = await getChainCoinBalance(address, web);
      const bscPrice = await calcBNBPrice();
      let tokensBalance = bscTokensContracts.map(async (v) => {
        const tokenBal = await getBalancesOfTokens(
          address,
          v.address,
          v.decimals,
          web
        );

        return {
          name: v.name,
          decimals: v.decimals,
          balance: tokenBal.balance,
          price: "1",
          contract: v.address,
          network: "Bep20",
        };
      });
      return [
        {
          name: "BSC",
          balance: innateToken,
          decimals: v.decimals,
          price: bscPrice,
          network: "Bep20",
        },
        ...(await Promise.all(tokensBalance)),
      ];
    } else if (v === "eth") {
      const web = new Web3(mainnet);
      const innateToken = await getChainCoinBalance(address, web);
      const ethPrice = await calcETHPrice();
      let tokensBalance = ethTokensContracts.map(async (v) => {
        const tokenBal = await getBalancesOfTokens(
          address,
          v.address,
          v.decimals,
          web
        );

        return {
          name: v.name,
          decimals: v.decimals,
          balance: tokenBal.balance,
          contract: v.address,
          price: "1",
          network: "Erc20",
        };
      });
      return [
        {
          name: "ETH",
          balance: innateToken,
          decimals: v.decimals,
          price: ethPrice,
          network: "Erc20",
        },
        ...(await Promise.all(tokensBalance)),
      ];
    }
  });
  const result = _.flattenDeep(await Promise.all(tokens));
  return result;
}
async function getBalancesOfTokens(address, tokenAddr, decimals, webuse) {
  const contract = new webuse.eth.Contract(minABI, tokenAddr);
  const result = await contract.methods.balanceOf(address).call();
  // const format = web3.utils.fromWei(result);
  return { balance: parseInt(result) / 10 ** decimals };
}
async function getChainCoinBalance(address, webtouse) {
  let balance = await webtouse.eth.getBalance(address);
  let finalBalance = webtouse.utils.fromWei(balance, "ether");
  return finalBalance;
}
export async function calcBNBPrice() {
  let pancakeSwapContract =
    "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();
  const web = new Web3("https://bsc-dataseed1.binance.org");
  const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; //BNB
  const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"; //USDT
  let bnbToSell = web.utils.toWei("1", "ether");
  let amountOut;
  try {
    let router = await new web.eth.Contract(
      pancakeSwapAbi,
      pancakeSwapContract
    );
    amountOut = await router.methods
      .getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress])
      .call();
    amountOut = web.utils.fromWei(amountOut[1]);
  } catch (error) {}
  if (!amountOut) return 0;
  return amountOut;
}
export async function calcETHPrice() {
  let pancakeSwapContract =
    "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();
  const web = new Web3("https://bsc-dataseed1.binance.org");
  const ETHTokenAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"; //BNB
  const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"; //USDT
  let bnbToSell = web.utils.toWei("1", "ether");
  let amountOut;
  try {
    let router = await new web.eth.Contract(
      pancakeSwapAbi,
      pancakeSwapContract
    );
    amountOut = await router.methods
      .getAmountsOut(bnbToSell, [ETHTokenAddress, USDTokenAddress])
      .call();
    amountOut = web.utils.fromWei(amountOut[1]);
  } catch (error) {}
  if (!amountOut) return 0;
  return amountOut;
}

export function encryptPrivateKey(key, pass) {
  return web3.eth.accounts.encrypt(key, pass);
}

export async function getBalanceFromAPi(address) {
  const chainIds = [
    { id: 1, network: "eth" },
    { id: 56, network: "bsc" },
  ];
  const apiKey = process.env.COINS_API_KEY;
  const returnedBalances = chainIds.map(async (v) => {
    let apiresp = await axios.get(
      `https://api.covalenthq.com/v1/${v.id}/address/${address}/balances_v2/?&key=${apiKey}`
    );
    // console.log(apiresp.data?.data?.items)
    let item = await apiresp.data?.data?.items;
    item = item.map((a) => {
      return { ...a, network: v.network };
    });
    // console.log(item)
    return item;
  });

  // const result = returnedBalances;
  // console.log(await Promise.all(returnedBalances))
  // const expecteTokens = ['usdt','eth','bsc','bnb']
  const result = _.flattenDeep(await Promise.all(returnedBalances));
  const finRes = result.map((v) => {
    const { contract_decimals, balance } = v;
    return { ...v, final_balance: parseInt(balance) / 10 ** contract_decimals };
  });

  // return _.flattenDeep(await Promise.all(returnedBalances));
  return finRes;
}

export const sendtoken = async (
  privKey,
  tokencontract,
  amount,
  chain,
  tokenshort,
  receivingAddr,
  fromAddr,
  deci
) => {
  const chainnet = {
    erc20: {
      id: 1,
      rpc: "https://mainnet.infura.io/v3/3be3e1343a95427ba6f96e5e1d38e7cd",
    },
    bep20: {
      id: 56,
      rpc: bscMainnetRpc,
    },
  };
  const currChain = chainnet[chain.toLowerCase()];
  const web = new Web3(currChain.rpc);
  if (
    tokenshort.toLowerCase() === "eth" ||
    tokenshort.toLowerCase() === "bsc"
  ) {
    try {
      // let value = web.utils.toWei(`${amount}`, 'ether')
      let value = amount * 10 ** 18;

      const gasEst = await web.eth.estimateGas({ from: fromAddr });

      const builTx = await web.eth.accounts.signTransaction(
        {
          from: fromAddr,
          to: receivingAddr,
          value: value,
          gas: gasEst,
        },
        privKey
      );

      const createReciept = await web.eth.sendSignedTransaction(
        builTx.rawTransaction
      );
      return createReciept;
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
        error_message: "An error occurred while sending transaction",
      };
    }
  } else {
    try {
      let value = `${amount * 10 ** deci}`;
      const contract = new web.eth.Contract(minABI, tokencontract, {
        from: fromAddr,
      });
      const transferCt = await contract.methods
        .transfer(receivingAddr, value)
        .encodeABI();
      const gasEst = await web.eth.estimateGas({
        from: fromAddr,
        toAddress: receivingAddr,
      });
      let txCount = await web.eth.getTransactionCount(fromAddr);
      let rawTransaction = {
        from: fromAddr,
        gas: gasEst,
        to: tokencontract,
        data: transferCt,
        nonce: web.utils.toHex(txCount),
      };

      let transaction = await web.eth.accounts.signTransaction(
        rawTransaction,
        privKey
      );
      let reciept = await web.eth.sendSignedTransaction(
        transaction.rawTransaction
      );
      return reciept;
    } catch (e) {
      return {
        error: e,
        error_msg: "An error occurred while sending transaction",
      };
    }
  }
};

export async function getTransactionHistory(tx, network, amount) {
  const chainnet = {
    erc20: {
      id: 1,
      rpc: "https://mainnet.infura.io/v3/3be3e1343a95427ba6f96e5e1d38e7cd",
    },
    bep20: {
      id: 56,
      rpc: bscMainnetRpc,
    },
  };
  try {
    const currChain = chainnet[network.toLowerCase()];
    const web = new Web3(currChain.rpc);
    let txHist = await web.eth.getTransaction(tx);
    txHist.value = web.utils.fromWei(txHist.value, "ether");
    let successful =
      txHist.blockHash && txHist.blockNumber && txHist.transactionIndex
        ? true
        : false;
    let from_address = txHist.from;
    let to_address = txHist.to;
    let value_quote = txHist.value;
    let block_signed_at = Date.now();
    let tx_hash = tx;
    let block_height = txHist.transactionIndex;
    return {
      successful,
      from_address,
      to_address,
      block_signed_at,
      tx_hash,
      block_height,
      value_quote,
    };
  } catch (e) {
    return { error: e.message };
  }
}
